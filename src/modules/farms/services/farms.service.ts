import { Inject, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DB } from 'src/database/config';
import { farms } from 'src/database/schemas/farm.schema';
import { clients } from 'src/database/schemas/client.schema';
import { CreateFarmDto, UpdateFarmDto, FindFarmsDto } from '../dtos';
import { eq, ilike, sql, isNull, SQL, and } from 'drizzle-orm';
import { SortOrder } from '../types/sortable-farm-fields';

@Injectable()
export class FarmsService {
  constructor(@Inject('DRIZZLE') private db: DB) {}

  async create(dto: CreateFarmDto, userId: number) {
    const [client] = await this.db.select().from(clients).where(eq(clients.id, dto.clientId));
    if (!client) throw new NotFoundException('Cliente não encontrado');
    if (client.userId !== userId) throw new ForbiddenException('Este cliente não pertence ao usuário autenticado');

    const [farm] = await this.db
      .insert(farms)
      .values({
        name: dto.name,
        totalArea: dto.totalArea,
        plotCount: dto.plotCount,
        foundationDate: new Date(dto.foundationDate),
        clientId: dto.clientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return farm;
  }

  async findAll(params: FindFarmsDto & { userId: number }) {
    const { page, limit, name, sortBy, order, userId } = params;
    const offset = (page - 1) * limit;

    const rawFilters = [
      eq(clients.userId, userId),
      name ? ilike(farms.name, `%${name}%`) : undefined,
      isNull(farms.deletedAt),
    ];
    const filters = rawFilters.filter((f): f is SQL => Boolean(f));

    const whereClause = filters.reduce((prev, curr) => sql`${prev} AND ${curr}`);

    const query = this.db
      .select()
      .from(farms)
      .innerJoin(clients, eq(farms.clientId, clients.id))
      .where(whereClause)
      .orderBy(order === SortOrder.asc ? sql`${farms[sortBy]} asc` : sql`${farms[sortBy]} desc`)
      .limit(limit)
      .offset(offset);

    const [results, total] = await Promise.all([
      query,
      this.db
        .select({ count: sql<number>`count(*)` })
        .from(farms)
        .innerJoin(clients, eq(farms.clientId, clients.id))
        .where(whereClause)
        .then(res => Number(res[0].count)),
    ]);

    return {
      data: results.map(row => row.farms),
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findById(id: string, userId: number) {
    const result = await this.db
      .select({
        farm: farms,
        client: clients,
      })
      .from(farms)
      .innerJoin(clients, eq(farms.clientId, clients.id))
      .where(and(eq(farms.id, Number(id)), eq(clients.userId, userId), isNull(farms.deletedAt)));

    if (!result.length) {
      throw new NotFoundException('Fazenda não encontrada ou acesso negado');
    }

    return result[0].farm;
  }

  async update(id: number, dto: UpdateFarmDto, userId: number) {
    const result = await this.db
      .select()
      .from(farms)
      .innerJoin(clients, eq(farms.clientId, clients.id))
      .where(and(eq(farms.id, id), eq(clients.userId, userId), isNull(farms.deletedAt)))
      .limit(1);

    const [farmFound] = result;

    if (!farmFound) {
      throw new ForbiddenException('Você não tem permissão para editar esta fazenda.');
    }

    await this.db
      .update(farms)
      .set({
        ...dto,
        foundationDate: dto.foundationDate ? new Date(dto.foundationDate) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(farms.id, id));

    return { message: 'Fazenda atualizada com sucesso.' };
  }

  async delete(id: number, userId: number) {
    const [farmFound] = await this.db
      .select()
      .from(farms)
      .innerJoin(clients, eq(farms.clientId, clients.id))
      .where(and(eq(farms.id, id), eq(clients.userId, userId), isNull(farms.deletedAt)))
      .limit(1);

    if (!farmFound) {
      throw new ForbiddenException('Você não tem permissão para deletar esta fazenda.');
    }

    await this.db.update(farms).set({ deletedAt: new Date(), updatedAt: new Date() }).where(eq(farms.id, id));

    return { message: 'Fazenda deletada com sucesso.' };
  }
}
