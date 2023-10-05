import { ControllerModule } from './modules/controller/controller.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import PrismaService from './libraries/prisma/prisma.service';

@Module({
  imports: [AuthModule, ControllerModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
