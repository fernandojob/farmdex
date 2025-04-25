import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Param,
  Post,
  UseGuards,
  Patch,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto } from '../dtos/create-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../auth/types/authenticated-user';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ListClientsDto } from '../dtos/list-clients.dto';
import { ClientDocs } from '../../../docs/decorators';

@Controller('clients')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ClientDocs.DocClientCreate()
  create(@Body() dto: CreateClientDto, @CurrentUser() user: AuthenticatedUser) {
    return this.clientsService.create(dto, user.id);
  }

  @Get(':id')
  @ClientDocs.DocClientFindById()
  async findById(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.clientsService.findById(id, user.id);
  }

  @Get()
  @ClientDocs.DocClientList()
  async listClients(
    @Query(new ValidationPipe({ transform: true })) query: ListClientsDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.clientsService.list({
      ...query,
      userId: user.id,
    });
  }

  @Patch(':id')
  @ClientDocs.DocClientUpdate()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.clientsService.update(id, dto, user.id);
  }

  @Delete(':id')
  @ClientDocs.DocClientDelete()
  async deleteClient(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.clientsService.remove(id, user.id);
  }
}
