import { Inject, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DB } from 'src/database/config';
import { farms } from 'src/database/schemas/farm.schema';
import { clients } from 'src/database/schemas/client.schema';
import { CreateFarmDto } from '../dtos/create-farm.dto';
import { eq, ilike, sql, isNull, SQL } from 'drizzle-orm';
import { FindFarmsDto } from '../dtos/find-farms.dto'; // Importe o DTO aqui
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
    // Use o DTO diretamente
    const { page, limit, name, sortBy, order, userId } = params;
    const offset = (page - 1) * limit;

    // 1) Lista de condições, sem valores undefined
    const rawFilters = [
      eq(clients.userId, userId),
      name ? ilike(farms.name, `%${name}%`) : undefined,
      isNull(farms.deletedAt), // Só fazendas não deletadas
    ];
    const filters = rawFilters.filter((f): f is SQL => Boolean(f));

    // 2) Combina filtros em um único SQL: "cond1 AND cond2 AND cond3"
    const whereClause = filters.reduce((prev, curr) => sql`${prev} AND ${curr}`);

    // 3) Monta a query principal
    const query = this.db
      .select()
      .from(farms)
      .innerJoin(clients, eq(farms.clientId, clients.id))
      .where(whereClause)
      .orderBy(order === SortOrder.asc ? sql`${farms[sortBy]} asc` : sql`${farms[sortBy]} desc`)
      .limit(limit)
      .offset(offset);

    // 4) Busca e contagem em paralelo
    const [results, total] = await Promise.all([
      // 4.1) Busca e 4.2) Contagem
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
}
