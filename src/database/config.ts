import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'farmdex',
});

client.connect().catch(err => {
  console.error('Could not connect to database:', err);
  process.exit(1);
});

export const db = drizzle(client, { schema });
export type DB = typeof db;
