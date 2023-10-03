import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  email: string;
}
