import { RecoveryDto } from './dto/recovery.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { generateJwt } from './../../libraries/encryption/jwt';
import {
  comparePassword,
  hashPassword,
} from './../../libraries/encryption/becrypt';
import { Injectable, HttpException, Scope, Inject } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import PrismaService from 'src/libraries/prisma/prisma.service';
import { HttpStatusCode } from 'axios';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(REQUEST)
    private readonly request: any,
    private prisma: PrismaService,
  ) {}
  async authenticate(authData: AuthenticateDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: authData.email,
        },
      });
      const validated = await comparePassword(authData.password, user.password);
      if (!validated) {
        throw Error();
      }
      const token = generateJwt(user);

      return { token };
    } catch (err) {
      new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }
  async changePassword(authData: ChangePasswordDto) {
    try {
      const validated = await comparePassword(
        authData.oldPassword,
        this.request.user.password,
      );
      if (!validated) {
        throw Error();
      }
      const updatedUser = this.prisma.user.update({
        where: {
          id: this.request.user.id,
        },
        data: {
          password: hashPassword(authData.newPassword),
        },
      });

      return updatedUser;
    } catch (err) {
      new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }
  async recovery(authData: RecoveryDto) {
    try {
      //
    } catch (err) {
      new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }
}
