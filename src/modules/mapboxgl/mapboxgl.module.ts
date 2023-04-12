import { Module } from '@nestjs/common';
import { MapboxglService } from './mapboxgl.service';
import { MapboxglController } from './mapboxgl.controller';

@Module({
  controllers: [MapboxglController],
  providers: [MapboxglService]
})
export class MapboxglModule {}
