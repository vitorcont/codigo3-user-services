import { ControllerModule } from './modules/controller/controller.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import PrismaService from './libraries/prisma/prisma.service';
import { TravelModule } from './modules/travel/travel.module';

@Module({
  imports: [AuthModule, ControllerModule, UsersModule, TravelModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
