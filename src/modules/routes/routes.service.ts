import { MapboxglService } from './../mapboxgl/mapboxgl.service';
import { FindRoute } from './dto/find-route.dtos';
import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(private readonly mapboxglService: MapboxglService) {}

  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  async findRoute(data: FindRoute) {
    try {
      return await this.mapboxglService.searchRoute(data);
    } catch (err) {
      //
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
