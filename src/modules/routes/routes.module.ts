import { MapboxglService } from './../mapboxgl/mapboxgl.service';
import { MapboxglModule } from './../mapboxgl/mapboxgl.module';
import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import PrismaService from 'src/libraries/prisma/prisma.service';

@Module({
  imports: [MapboxglModule],
  controllers: [RoutesController],
  providers: [PrismaService, MapboxglService, RoutesService],
})
export class RoutesModule {}
