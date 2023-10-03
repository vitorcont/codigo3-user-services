import { Injectable } from '@nestjs/common';
import { UpdateNavigationSocketDto } from './dto/update-navigation-socket.dto';
import { getCenterCoordinates, addDistance } from 'src/utils/routes';
import { FindRoute, IUserIndividual } from './dto/route';
import PrismaService from 'src/libraries/prisma/prisma.service';
import { MapboxglService } from '../mapboxgl/mapboxgl.service';

@Injectable()
export class NavigationSocketService {
  constructor(
    private readonly mapboxglService: MapboxglService,
    private prisma: PrismaService,
  ) {}

  async searchPath(data: FindRoute) {
    try {
      const foundRoutes = await this.mapboxglService.searchRoute(data);
      if (foundRoutes.routes.length <= 1) {
        return foundRoutes;
      }

      // const baseWaypoints = foundRoutes.routes[0].geometry.coordinates.map(
      //   (point) => ({
      //     latitude: point[1],
      //     longitude: point[0],
      //   }),
      // );
      // const routeCenter = getCenterCoordinates(baseWaypoints);

      // const areaControllersList = await this.prisma.trafficController.findMany({
      //   where: {
      //     AND: [
      //       { latitude: { lt: addDistance(routeCenter.latitude, 50) } },
      //       { latitude: { gt: addDistance(routeCenter.latitude, -50) } },
      //       { longitude: { lt: addDistance(routeCenter.latitude, 50, true) } },
      //       { longitude: { gt: addDistance(routeCenter.latitude, -50, true) } },
      //     ],
      //   },
      // });

      // const routesAvailable = [];

      // foundRoutes.routes.forEach((route) => {
      //   const counter = 0;
      //   const coordinates = route.geometry.coordinates;
      //   for (let i = 0, j = 1; j < coordinates.length; i++, j++) {}
      // });

      return foundRoutes;
    } catch (err) {
      //
    }
  }

  async saveTrip(id: string, userInfo: IUserIndividual) {
    try {
      await this.prisma.travel.create({
        data: {
          originLatitude: userInfo.origin.latitute,
          originLongitude: userInfo.origin.longitude,
          destinationLatitude: userInfo.destination.latitute,
          destinationLongitude: userInfo.destination.longitude,
          priority: userInfo.priority,
          departedAt: userInfo.startedAt,
          arrivedAt: new Date(),
          userId: id,
        },
      });
    } catch (err) {
      //
    }
  }
}
