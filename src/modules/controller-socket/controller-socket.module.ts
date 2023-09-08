import { Module } from '@nestjs/common';
import { ControllerSocketService } from './controller-socket.service';
import { ControllerSocketGateway } from './controller-socket.gateway';

@Module({
  providers: [ControllerSocketGateway, ControllerSocketService],
})
export class ControllerSocketModule {}
