import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import PrismaService from 'src/libraries/prisma/prisma.service';

@Module({
  controllers: [TravelController],
  providers: [PrismaService, TravelService],
})
export class TravelModule {}
