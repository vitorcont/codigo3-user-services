import { Module } from '@nestjs/common';
import { NavigationSocketService } from './navigation-socket.service';
import { NavigationSocketGateway } from './navigation-socket.gateway';
import PrismaService from 'src/libraries/prisma/prisma.service';
import { MapboxglService } from '../mapboxgl/mapboxgl.service';

@Module({
  providers: [
    PrismaService,
    MapboxglService,
    NavigationSocketGateway,
    NavigationSocketService,
  ],
})
export class NavigationSocketModule {}
