import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

async function main() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'farmdex',
  });
  await client.connect();
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  await client.end();
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
