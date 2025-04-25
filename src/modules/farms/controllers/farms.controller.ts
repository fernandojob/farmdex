import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FarmsService } from '../services/farms.service';
import { CreateFarmDto, UpdateFarmDto, FindFarmsDto } from '../dtos';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../auth/types/authenticated-user';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FarmDocs } from 'src/docs/decorators';

@Controller('farms')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @FarmDocs.DocFarmCreate()
  create(@Body() dto: CreateFarmDto, @CurrentUser() user: AuthenticatedUser) {
    return this.farmsService.create(dto, user.id);
  }

  @Get()
  @FarmDocs.DocFarmList()
  async findAll(@CurrentUser() user: AuthenticatedUser, @Query() dto: FindFarmsDto) {
    return this.farmsService.findAll({ ...dto, userId: user.id });
  }

  @Get(':id')
  @FarmDocs.DocFarmFindById()
  async findById(@Param('id', ParseIntPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.farmsService.findById(id, user.id);
  }

  @Patch(':id')
  @FarmDocs.DocFarmUpdate()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFarmDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.farmsService.update(id, dto, user.id);
  }

  @Delete(':id')
  @FarmDocs.DocFarmDelete()
  async deleteFarm(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.farmsService.delete(id, user.id);
  }
}
