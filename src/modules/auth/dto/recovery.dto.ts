import { ApiProperty } from '@nestjs/swagger';

export class RecoveryDto {
  @ApiProperty()
  email: string;
}
