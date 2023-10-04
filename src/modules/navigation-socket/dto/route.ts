import { ApiProperty } from '@nestjs/swagger';

export class ILocation {
  latitude: number;
  longitude: number;
  priority?: number;
}

export class ISearchRoute {
  origin: ILocation;
  destination: ILocation;
  priority: number;
}

export class IUpdateLocation {
  latitude: number;
  longitude: number;
  priority: number;
}

export type IUserIndividual = {
  origin: ILocation | null;
  destination: ILocation | null;
  currentLocation: ILocation | null;
  startedAt: Date | null;
  priority: number;
};

export type IUserMapper = {
  [K in `${string}`]: IUserIndividual | null;
};

export class FindRoute {
  @ApiProperty()
  originLatitude: number;
  @ApiProperty()
  originLongitude: number;
  @ApiProperty()
  destinationLatitude: number;
  @ApiProperty()
  destinationLongitude: number;
}
