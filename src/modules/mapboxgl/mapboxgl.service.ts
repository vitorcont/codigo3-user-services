import { maskCoordinates } from './../../utils/routes';
import { getRoutesInstance } from './../../libraries/api/axios';
import { Injectable } from '@nestjs/common';
import { CreateMapboxglDto } from './dto/create-mapboxgl.dto';
import { FindRoute } from '../routes/dto/find-route.dtos';
import { MapboxglRouteList } from './entities/mapboxgl.entity';

@Injectable()
export class MapboxglService {
  create(createMapboxglDto: CreateMapboxglDto) {
    return 'This action adds a new mapboxgl';
  }

  async searchRoute(routeData: FindRoute) {
    try {
      const routeInstance = getRoutesInstance();
      const { data } = await routeInstance.get(maskCoordinates(routeData));
      return data as MapboxglRouteList;
    } catch (err) {
      throw Error();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} mapboxgl`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapboxgl`;
  }
}
