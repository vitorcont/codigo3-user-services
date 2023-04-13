import { Module } from '@nestjs/common';
import { MapboxglService } from './mapboxgl.service';

@Module({
  controllers: [],
  providers: [MapboxglService],
  exports: [MapboxglService],
})
export class MapboxglModule {}
