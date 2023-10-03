import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import PrismaService from 'src/libraries/prisma/prisma.service';
import { CreateControllerSocketDto } from './dto/create-controller-socket.dto';
import { UpdateControllerSocketDto } from './dto/update-controller-socket.dto';

@Injectable()
export class ControllerSocketService {
  constructor(private prisma: PrismaService) {}
  async findControllerByToken(token: string) {
    try {
      const data = await this.prisma.trafficController.findFirst({
        where: {
          token,
        },
      });
      return data;
    } catch (err) {}
  }

  findAll() {
    return `This action returns all controllerSocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} controllerSocket`;
  }

  update(id: number, updateControllerSocketDto: UpdateControllerSocketDto) {
    return `This action updates a #${id} controllerSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} controllerSocket`;
  }
}
