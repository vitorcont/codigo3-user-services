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

  @WebSocketServer() controllerServer: Server;

  private activeControllerList: IControllerMapper = {};

  handleConnection(client: Socket) {
    this.controllerServer.emit('success', {
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
  async createRoom(
    @MessageBody() socketController: CreateControllerSocketDto,
    @ConnectedSocket() client: Socket,
  ) {
    const controller = await this.controllerSocketService.findControllerByToken(
      socketController.token,
    );
    client.join(`intersection-${controller.intersectionId}`);
    this.controllerServer
      .to(`intersection-${controller.intersectionId}`)
      .emit('roomCreated', {
        room: `intersection-${controller.intersectionId}`,
      });

    this.activeControllerList[controller.intersectionId];
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
