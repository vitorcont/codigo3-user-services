import { maskCoordinates } from './../../utils/routes';
import { getRoutesInstance } from './../../libraries/api/axios';
import { Injectable } from '@nestjs/common';
import { CreateMapboxglDto } from './dto/create-mapboxgl.dto';
import { FindRoute } from '../routes/dto/find-route.dtos';

@Injectable()
export class MapboxglService {
  create(createMapboxglDto: CreateMapboxglDto) {
    return 'This action adds a new mapboxgl';
  }

  async searchRoute(data: FindRoute) {
    try {
      const routeInstance = getRoutesInstance();
      const route = await routeInstance.get(maskCoordinates(data));

      return route;
    } catch (err) {
      console.log(err);
      //
    }
    return `This action returns all mapboxgl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mapboxgl`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapboxgl`;
  }
}
