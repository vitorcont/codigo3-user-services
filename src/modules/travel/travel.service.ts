import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import PrismaService from 'src/libraries/prisma/prisma.service';

@Injectable()
export class TravelService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      console.log('resultado');
      const result = await this.prisma.travel.findMany();
      console.log('resultado', result);

      return result;
    } catch (err) {
      new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.travel.findFirst({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.travel.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return result;
    } catch (err) {
      new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }
}
