import { ControllerModule } from './modules/controller/controller.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MapboxglModule } from './modules/mapboxgl/mapboxgl.module';
import { Module } from '@nestjs/common';
import { NavigationSocketModule } from './modules/navigation-socket/navigation-socket.module';
import { ControllerSocketModule } from './modules/controller-socket/controller-socket.module';
import PrismaService from './libraries/prisma/prisma.service';

@Module({
  imports: [
    NavigationSocketModule,
    MapboxglModule,
    AuthModule,
    ControllerModule,
    UsersModule,
    ControllerSocketModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
