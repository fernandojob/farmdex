import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { DB } from '../../../database/config';
import * as schema from '../../../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE') private db: DB) {}

  async create(email: string, passwordHash: string) {
    const [exists] = await this.db.select().from(schema.users).where(eq(schema.users.email, email));
    if (exists) throw new ConflictException('Email já cadastrado');

    const [user] = await this.db.insert(schema.users).values({ email, password: passwordHash }).returning();
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await this.db.select().from(schema.users).where(eq(schema.users.email, email));
    return user;
  }

  async findById(id: number) {
    const [user] = await this.db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }
}
