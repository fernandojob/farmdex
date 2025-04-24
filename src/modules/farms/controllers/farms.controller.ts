import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FarmsService } from '../services/farms.service';
import { CreateFarmDto } from '../dtos/create-farm.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../auth/types/authenticated-user';
import { FindFarmsDto } from '../dtos/find-farms.dto'; // Importe o DTO aqui

@Controller('farms')
@UseGuards(AuthGuard('jwt'))
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  create(@Body() dto: CreateFarmDto, @CurrentUser() user: AuthenticatedUser) {
    return this.farmsService.create(dto, user.id);
  }

  @Get()
  async findAll(
    @CurrentUser() user: AuthenticatedUser, // Use o tipo correto aqui
    @Query() dto: FindFarmsDto, // Passa o DTO para o @Query
  ) {
    // Agora podemos usar o DTO diretamente
    return this.farmsService.findAll({ ...dto, userId: user.id });
  }
}
