import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './modules/auth/decorators/current-user.decorator';

@Controller()
export class AppController {
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@CurrentUser() user: any) {
    return {
      message: 'Você acessou uma rota protegida!',
      user,
    };
  }
}
