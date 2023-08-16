import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerController } from './controller.controller';
import PrismaService from 'src/libraries/prisma/prisma.service';

@Module({
  controllers: [ControllerController],
  providers: [PrismaService, ControllerService],
})
export class ControllerModule {}
