import { ChangePasswordDto } from './dto/change-password.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
  @Post('changePassword')
  changePassword(@Body() authData: ChangePasswordDto) {
    return this.authService.changePassword(authData);
  }
  @Post('recovery')
  recovery(@Body() authData: RecoveryDto) {
    return this.authService.recovery(authData);
  }
}
