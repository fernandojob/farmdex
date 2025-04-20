import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  name: text('name').notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  cpf: varchar('cpf', { length: 14 }).notNull().unique(),
  birthDate: timestamp('birth_date').notNull(),
  phone: varchar('phone', { length: 20 }),
  zipCode: varchar('zip_code', { length: 10 }),
  country: text('country'),
  state: text('state'),
  city: text('city'),
  address: text('address'),
  number: varchar('number', { length: 10 }),
  complement: text('complement'),
  createdAt: timestamp('created_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
