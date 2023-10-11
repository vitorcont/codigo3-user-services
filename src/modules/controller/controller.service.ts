import { UpdateControllerDto } from './dto/update-controller.dto';
import { Injectable } from '@nestjs/common';
import PrismaService from 'src/libraries/prisma/prisma.service';

@Injectable()
export class ControllerService {
  constructor(private prisma: PrismaService) {}

  async create(createControllerDto: any) {
    try {
      const created = await this.prisma.trafficController.create({
        data: createControllerDto,
      });

      return created;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const all = await this.prisma.trafficController.findMany();

      return all;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const unique = await this.prisma.trafficController.findFirst({
        where: {
          id,
        },
      });

      return unique;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateControllerDto: UpdateControllerDto) {
    try {
      const unique = await this.prisma.trafficController.update({
        where: {
          id,
        },
        data: updateControllerDto,
      });

      return unique;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const unique = await this.prisma.trafficController.delete({
        where: {
          id,
        },
      });

      return unique;
    } catch (error) {
      throw error;
    }
  }
}
