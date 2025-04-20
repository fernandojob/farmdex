import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

const client = new Client({
  host: 'postgres',
  port: 5432,
  user: 'farmdex_user',
  password: 'farmdex_pass',
  database: 'farmdex',
});

async function main() {
  await client.connect();
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  await client.end();
}

main();
