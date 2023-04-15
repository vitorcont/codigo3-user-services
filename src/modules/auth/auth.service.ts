import { RecoveryDto } from './dto/recovery.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { generateJwt } from './../../libraries/encryption/jwt';
import { comparePassword } from './../../libraries/encryption/becrypt';
import { Injectable, HttpException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import PrismaService from 'src/libraries/prisma/prisma.service';
import { HttpStatusCode } from 'axios';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
      //
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
