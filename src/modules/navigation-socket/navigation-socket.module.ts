import { Module } from '@nestjs/common';
import { NavigationSocketService } from './navigation-socket.service';
import { NavigationSocketGateway } from './navigation-socket.gateway';

@Module({
  providers: [NavigationSocketGateway, NavigationSocketService],
})
export class NavigationSocketModule {}
