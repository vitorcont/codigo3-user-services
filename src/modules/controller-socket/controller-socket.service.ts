import { Injectable } from '@nestjs/common';
import { CreateControllerSocketDto } from './dto/create-controller-socket.dto';
import { UpdateControllerSocketDto } from './dto/update-controller-socket.dto';

@Injectable()
export class ControllerSocketService {
  create(createControllerSocketDto: CreateControllerSocketDto) {
    return 'This action adds a new controllerSocket';
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
