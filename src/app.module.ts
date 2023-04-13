import { RoutesModule } from './modules/routes/routes.module';
import { MapboxglModule } from './modules/mapboxgl/mapboxgl.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MapboxglModule, RoutesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
