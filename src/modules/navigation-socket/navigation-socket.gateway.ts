import { SocketUser } from './entities/navigation-socket.entity';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NavigationSocketService } from './navigation-socket.service';
import { ISearchRoute, IUserMapper, IUpdateLocation } from './dto/route';

@WebSocketGateway({ namespace: 'navigation-socket' })
export class NavigationSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly navigationSocketService: NavigationSocketService,
  ) {}
  private activeUserList: IUserMapper = {};
  @WebSocketServer() navigationServer: Server;

  handleConnection(client: Socket) {
    this.navigationServer.emit('success', {
      client: client.id,
    });
  }
  async handleDisconnect(client: Socket) {
    try {
      console.log('DISCONNECT', client.rooms);
      const room = Array.from(client.rooms).find((item) =>
        item.includes('user-'),
      );
      const userId = room.split('user-')[1];

      if (this.activeUserList[userId].destination) {
        await this.navigationSocketService.saveTrip(
          userId,
          this.activeUserList[userId],
        );
      }

      client.leave(room);
    } catch (err) {
      const room = Array.from(client.rooms)[0];
      client.leave(room);
    }
  }

  @SubscribeMessage('registerUser')
  createRoom(
    @MessageBody() socketUser: SocketUser,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`user-${socketUser.userId}`);
    this.activeUserList[socketUser.userId] = null;
    this.navigationServer
      .to(`user-${socketUser.userId}`)
      .emit('roomCreated', { room: `user-${socketUser.userId}` });
  }

  @SubscribeMessage('startTrip')
  async findAll(
    @ConnectedSocket() client: Socket,
    @MessageBody() userInfo: ISearchRoute,
  ) {
    const room = Array.from(client.rooms).find((item) =>
      item.includes('user-'),
    );
    const userId = room.split('user-')[1];
    this.activeUserList[userId] = {
      currentLocation: null,
      destination: userInfo.destination,
      origin: userInfo.origin,
      startedAt: new Date(),
      priority: userInfo.priority,
    };

    const path = await this.navigationSocketService.searchPath({
      originLatitude: userInfo.origin.latitute,
      originLongitude: userInfo.origin.longitude,
      destinationLatitude: userInfo.destination.latitute,
      destinationLongitude: userInfo.destination.longitude,
    });

    this.navigationServer.to(room).emit('tripPath', path);
  }

  @SubscribeMessage('updateLocation')
  verifyPath(
    @ConnectedSocket() client: Socket,
    @MessageBody() userInfo: IUpdateLocation,
  ) {
    try {
      const room = Array.from(client.rooms).find((item) =>
        item.includes('user-'),
      );
      console.log(this.activeUserList, client.rooms);
      const userId = room.split('user-')[1];
      this.activeUserList[userId] = {
        ...this.activeUserList[userId],
        priority: userInfo.priority,
        currentLocation: { ...userInfo },
      };
    } catch (err) {
      const room = Array.from(client.rooms)[0];
      console.log('A', room);

      this.navigationServer.to(room).emit('retryRegistration', {});
    }
  }

  @SubscribeMessage('endTrip')
  async endSession(@ConnectedSocket() client: Socket) {
    const room = Array.from(client.rooms).find((item) =>
      item.includes('user-'),
    );
    const userId = room.split('user-')[1];

    await this.navigationSocketService.saveTrip(
      userId,
      this.activeUserList[userId],
    );

    this.activeUserList[userId] = {
      ...this.activeUserList[userId],
      origin: null,
      destination: null,
      startedAt: null,
      priority: 0,
    };
  }

  @SubscribeMessage('getUsersLocations')
  verifyUsers(@ConnectedSocket() client: Socket) {
    const room = Array.from(client.rooms).find((item) =>
      item.includes('user-'),
    );

    this.navigationServer
      .to(room)
      .emit('usersLocations', { ...this.activeUserList });
  }
}
