import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HttpStatusCode } from 'axios';
import { hashPassword } from 'src/libraries/encryption/becrypt';
import PrismaService from 'src/libraries/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @Inject(REQUEST)
    private readonly request: any,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = hashPassword(createUserDto.password);
      const result = await this.prisma.user.create({
        data: { ...createUserDto, password: hashedPassword, deletedAt: null },
      });

      return result;
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.user.findMany();

      return result;
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }

  async findMe() {
    try {
      console.log('HERE', this.request.user);
      const result = await this.prisma.user.findFirst({
        where: {
          id: this.request.user.id,
        },
      });

      return result;
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name: updateUserDto.name,
        },
      });

      return result;
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return result;
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatusCode.BadRequest);
    }
  }
}
