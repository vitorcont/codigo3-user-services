import { Injectable } from '@nestjs/common';
import { CreateMapboxglDto } from './dto/create-mapboxgl.dto';
import { UpdateMapboxglDto } from './dto/update-mapboxgl.dto';

@Injectable()
export class MapboxglService {
  create(createMapboxglDto: CreateMapboxglDto) {
    return 'This action adds a new mapboxgl';
  }

  findAll() {
    return `This action returns all mapboxgl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mapboxgl`;
  }

  update(id: number, updateMapboxglDto: UpdateMapboxglDto) {
    return `This action updates a #${id} mapboxgl`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapboxgl`;
  }
}
