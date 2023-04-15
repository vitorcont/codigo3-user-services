import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoutesModule } from './modules/routes/routes.module';
import { MapboxglModule } from './modules/mapboxgl/mapboxgl.module';
import { Module } from '@nestjs/common';
import PrismaService from './libraries/prisma/prisma.service';

@Module({
  imports: [MapboxglModule, AuthModule, RoutesModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
