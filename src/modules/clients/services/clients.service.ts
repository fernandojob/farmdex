import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ListClientsDto } from '../dtos/list-clients.dto';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(ClientsRepository)
    private readonly repository: ClientsRepository,
  ) {}

  async create(dto: CreateClientDto, userId: number) {
    const existingClients = await this.repository.findByUserId(userId);
    if (existingClients.length > 0) {
      throw new ConflictException('Cliente já existe');
    }

    return this.repository.create(dto, userId);
  }

  async list(params: ListClientsDto & { userId: number }) {
    return this.repository.listClients(params);
  }

  async findById(id: number, userId: number) {
    const client = await this.repository.findById(id, userId);
    if (!client) throw new NotFoundException('Cliente não encontrado');
    return client;
  }

  async update(id: number, dto: UpdateClientDto, userId: number) {
    await this.findById(id, userId);
    return this.repository.update(id, dto, userId);
  }

  async remove(id: number, userId: number) {
    await this.findById(id, userId);
    return this.repository.softDelete(id, userId);
  }
}
