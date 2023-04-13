import { ApiProperty } from '@nestjs/swagger';

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
