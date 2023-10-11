import { ApiProperty } from '@nestjs/swagger';

export class CreateControllerDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt: Date;
}
