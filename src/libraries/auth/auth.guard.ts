import { DateTime } from 'luxon';
import PrismaService from '../prisma/prisma.service';
import {
  ExecutionContext,
  CanActivate,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decodeJwt } from '../encryption/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      console.log('AA');
      const entireToken: string = request.headers.authorization;
      const treatedToken = entireToken.split('Bearer ')[1];

      const firstLayer = decodeJwt(treatedToken, process.env.JWT_SECRET);
      if (firstLayer.expireAt < DateTime.now()) {
        throw new UnauthorizedException();
      }

      const user = await this.prisma.user.findFirst({
        where: {
          email: firstLayer.email,
        },
      });

      const secondLayer = decodeJwt(
        firstLayer.subToken,
        user.createdAt.toISOString(),
      );

      if (secondLayer.expireAt !== firstLayer.expireAt) {
        throw new UnauthorizedException();
      }

      request.user = user;

      return true;
    } catch (err) {
      console.log('auth_error', err);
      throw new UnauthorizedException();
    }
  }
}
