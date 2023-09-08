import { Injectable } from '@nestjs/common';
import { CreateNavigationSocketDto } from './dto/create-navigation-socket.dto';
import { UpdateNavigationSocketDto } from './dto/update-navigation-socket.dto';

@Injectable()
export class NavigationSocketService {
  create(createNavigationSocketDto: CreateNavigationSocketDto) {
    return 'This action adds a new navigationSocket';
  }

  findAll() {
    return `This action returns all navigationSocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} navigationSocket`;
  }

  update(id: number, updateNavigationSocketDto: UpdateNavigationSocketDto) {
    return `This action updates a #${id} navigationSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} navigationSocket`;
  }
}
