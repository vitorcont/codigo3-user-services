import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ControllerSocketService } from './controller-socket.service';
import { CreateControllerSocketDto } from './dto/create-controller-socket.dto';
import { UpdateControllerSocketDto } from './dto/update-controller-socket.dto';

@WebSocketGateway({ namespace: 'controller-socket' })
export class ControllerSocketGateway {
  constructor(
    private readonly controllerSocketService: ControllerSocketService,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    this.server.emit('success', {
      client: client.id,
    });
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
  }

  @SubscribeMessage('closeConnection')
  endSession(@ConnectedSocket() client: Socket) {
    const room = Array.from(client.rooms).find((item) =>
      item.includes('intersection-'),
    );
    client.leave(room);
    client.disconnect;

    return '';
  }
}
