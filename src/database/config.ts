import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect().catch(err => {
  console.error('Could not connect to database:', err);
  process.exit(1);
});

export const db = drizzle(client, { schema });
export type DB = typeof db;
