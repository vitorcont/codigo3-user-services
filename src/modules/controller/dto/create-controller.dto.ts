import { ApiProperty } from '@nestjs/swagger';

export class CreateControllerDto {
  @ApiProperty()
  pathId: string;
  @ApiProperty()
  token: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
  @ApiProperty()
  direction: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt: Date;
}
