import {
  getCenterCoordinates,
  isPointInside,
  addDistance,
} from './../../utils/routes';
import { MapboxglService } from './../mapboxgl/mapboxgl.service';
import { FindRoute } from './dto/find-route.dtos';
import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import PrismaService from 'src/libraries/prisma/prisma.service';

@Injectable()
export class RoutesService {
  constructor(
    private readonly mapboxglService: MapboxglService,
    private prisma: PrismaService,
  ) {}

  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  async findRoute(data: FindRoute) {
    try {
      const foundRoutes = await this.mapboxglService.searchRoute(data);
      if (foundRoutes.routes.length <= 1) {
        return foundRoutes;
      }

      const baseWaypoints = foundRoutes.routes[0].geometry.coordinates.map(
        (point) => ({
          latitude: point[1],
          longitude: point[0],
        }),
      );
      const routeCenter = getCenterCoordinates(baseWaypoints);

      const controllersList = await this.prisma.trafficController.findMany({
        where: {
          AND: [
            { latitude: { lt: addDistance(routeCenter.latitude, 50) } },
            { latitude: { gt: addDistance(routeCenter.latitude, -50) } },
            { longitude: { lt: addDistance(routeCenter.latitude, 50, true) } },
            { longitude: { gt: addDistance(routeCenter.latitude, -50, true) } },
          ],
        },
      });

      const routesAvailable = [];

      foundRoutes.routes.forEach((route) => {
        const counter = 0;
        const coordinates = route.geometry.coordinates;
        for (let i = 0, j = 1; j < coordinates.length; i++, j++) {
          const pointInitial = {
            center: {
              latitude: coordinates[i][1],
              longitude: coordinates[i][0],
            },
            minusOffset: {
              latitude: addDistance(coordinates[i][1], -0.02),
              longitude: addDistance(coordinates[i][0], -0.02, true),
            },
            plusOffset: {
              latitude: addDistance(coordinates[i][1], 0.02),
              longitude: addDistance(coordinates[i][0], 0.02, true),
            },
          };
          const pointFinal = {
            center: {
              latitude: coordinates[j][1],
              longitude: coordinates[j][0],
            },
            minusOffset: {
              latitude: addDistance(coordinates[j][1], -0.02),
              longitude: addDistance(coordinates[j][0], -0.02, true),
            },
            plusOffset: {
              latitude: addDistance(coordinates[j][1], 0.02),
              longitude: addDistance(coordinates[j][0], 0.02, true),
            },
          };
        }
      });

      return null;
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
