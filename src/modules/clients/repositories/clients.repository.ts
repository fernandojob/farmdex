import { clients } from 'src/database/schemas/client.schema';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ListClientsDto } from '../dtos/list-clients.dto';

export type Client = typeof clients.$inferSelect;

export abstract class ClientsRepository {
  abstract create(dto: CreateClientDto, userId: number): Promise<Client>;
  abstract listClients(params: ListClientsDto & { userId: number }): Promise<{
    data: Client[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }>;
  abstract findByUserId(userId: number): Promise<Client[]>;
  abstract findById(id: number, userId: number): Promise<Client | null>;
  abstract update(id: number, dto: UpdateClientDto, userId: number): Promise<void>;
  abstract softDelete(id: number, userId: number): Promise<void>;
}
