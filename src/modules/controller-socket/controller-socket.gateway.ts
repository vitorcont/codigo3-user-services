import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ControllerSocketService } from './controller-socket.service';
import { CreateControllerSocketDto } from './dto/create-controller-socket.dto';
import { IControllerMapper } from './entities/controller-socket.entity';

@WebSocketGateway({ namespace: 'controller-socket' })
export class ControllerSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly controllerSocketService: ControllerSocketService,
  ) {}

  @WebSocketServer() server: Server;

  private activeControllerList: IControllerMapper = {};

  handleConnection(client: Socket) {
    this.server.emit('success', {
      client: client.id,
    });
  }

  async handleDisconnect(client: Socket) {
    const room = Array.from(client.rooms).find((item) =>
      item.includes('intersection-'),
    );

    client.leave(room);
  }

  @SubscribeMessage('syncController')
  createRoom(
    @MessageBody() socketController: CreateControllerSocketDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`intersection-${socketController.intersectionId}`);
    this.server
      .to(`intersection-${socketController.intersectionId}`)
      .emit('roomCreated', {
        room: `intersection-${socketController.intersectionId}`,
      });

    this.activeControllerList[socketController.intersectionId];
  }

  @SubscribeMessage('closeConnection')
  endSession(@ConnectedSocket() client: Socket) {
    const room = Array.from(client.rooms).find((item) =>
      item.includes('intersection-'),
    );
    const intersectionId = room.split('intersection-')[0];
    client.leave(room);
    client.disconnect;
    delete this.activeControllerList[intersectionId];

    return '';
  }
}
