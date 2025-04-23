import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterAuthDto } from '../dtos/register-auth.dto';
import { LoginAuthDto } from '../dtos/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
}
