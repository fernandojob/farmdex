import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { clients } from 'src/database/schemas/client.schema';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ListClientsDto } from '../dtos/list-clients.dto';
import { DB } from 'src/database/config';
import { eq, or, and, isNull, ilike, sql } from 'drizzle-orm';

@Injectable()
export class DrizzleClientsRepository extends ClientsRepository {
  constructor(@Inject('DRIZZLE') private db: DB) {
    super();
  }

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

  async listClients(params: ListClientsDto & { userId: number }) {
    const { page, limit, orderBy, order, name, userId } = params;
    const offset = (page - 1) * limit;

    const filters = [eq(clients.userId, userId), isNull(clients.deletedAt)];
    if (name) filters.push(ilike(clients.name, `%${name}%`));

    const result = await this.db
      .select()
      .from(clients)
      .where(and(...filters))
      .orderBy(order === 'asc' ? sql`${clients[orderBy]} ASC` : sql`${clients[orderBy]} DESC`)
      .limit(limit)
      .offset(offset);

    const total = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(clients)
      .where(and(...filters));

    return {
      data: result,
      meta: {
        total: total[0].count,
        page,
        limit,
        pages: Math.ceil(total[0].count / limit),
      },
    };
  }

  async findByUserId(userId: number) {
    return this.db.select().from(clients).where(eq(clients.userId, userId));
  }

  async findById(id: number, userId: number) {
    const result = await this.db
      .select()
      .from(clients)
      .where(and(eq(clients.id, id), eq(clients.userId, userId), isNull(clients.deletedAt)));

    return result[0] || null;
  }

  async update(id: number, dto: UpdateClientDto, userId: number) {
    await this.findByIdOrFail(id, userId);
    await this.db
      .update(clients)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(clients.id, id));
  }

  async softDelete(id: number, userId: number) {
    await this.findByIdOrFail(id, userId);
    await this.db.update(clients).set({ deletedAt: new Date() }).where(eq(clients.id, id));
  }

  private async findByIdOrFail(id: number, userId: number) {
    const client = await this.findById(id, userId);
    if (!client) throw new NotFoundException('Cliente não encontrado');
  }
}
