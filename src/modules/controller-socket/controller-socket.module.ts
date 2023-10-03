import { Module } from '@nestjs/common';
import { ControllerSocketService } from './controller-socket.service';
import { ControllerSocketGateway } from './controller-socket.gateway';
import PrismaService from 'src/libraries/prisma/prisma.service';

@Module({
  providers: [PrismaService, ControllerSocketGateway, ControllerSocketService],
  exports: [ControllerSocketService],
})
export class ControllerSocketModule {}
