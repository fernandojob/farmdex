import { Inject, ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dtos/create-client.dto';
import { clients } from 'src/database/schemas/client.schema';
import { eq, or } from 'drizzle-orm';
import { DB } from 'src/database/config';

@Injectable()
export class ClientsService {
  constructor(@Inject('DRIZZLE') private db: DB) {}

  async create(dto: CreateClientDto, userId: number) {
    const existing = await this.db
      .select()
      .from(clients)
      .where(or(eq(clients.cpf, dto.cpf), eq(clients.email, dto.email)));

    if (existing.length) {
      throw new ConflictException('CPF ou Email já cadastrado');
    }

    const [client] = await this.db
      .insert(clients)
      .values({
        ...dto,
        userId,
        birthDate: new Date(dto.birthDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return client;
  }

  async findByUserId(userId: number) {
    return this.db.select().from(clients).where(eq(clients.userId, userId));
  }
}
