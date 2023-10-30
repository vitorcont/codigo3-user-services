import { ChangePasswordDto } from './dto/change-password.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { RecoveryDto } from './dto/recovery.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authData: AuthenticateDto) {
    return this.authService.authenticate(authData);
  }
  @Post('change-password')
  changePassword(@Body() authData: ChangePasswordDto) {
    return this.authService.changePassword(authData);
  }
  @Post('recovery-request')
  recovery(@Body() authData: RecoveryDto) {
    return this.authService.recoveryMail(authData);
  }
}
