import { Module } from '@nestjs/common';
import PrismaService from 'src/libraries/prisma/prisma.service';
import { MapboxglService } from './mapboxgl.service';

@Module({
  controllers: [],
  providers: [PrismaService, MapboxglService],
  exports: [MapboxglService],
})
export class MapboxglModule {}
