import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { clients } from './client.schema';

export const farms = pgTable('farms', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id')
    .references(() => clients.id)
    .notNull(),
  name: text('name').notNull(),
  totalArea: integer('total_area').notNull(),
  plotCount: integer('plot_count').notNull(),
  foundationDate: timestamp('foundation_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
