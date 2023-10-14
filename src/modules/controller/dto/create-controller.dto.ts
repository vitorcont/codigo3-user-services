import { ApiProperty } from '@nestjs/swagger';

export class CreateControllerDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}
