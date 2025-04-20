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

export const db = drizzle(client, { schema });

async function main() {
  try {
    await client.connect();

    await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during database connection or migration:', error.message);
    } else {
      console.error('Unknown error occurred during database operation.');
    }
  } finally {
    try {
      await client.end();
    } catch (endError) {
      if (endError instanceof Error) {
        console.error('Error during closing database connection:', endError.message);
      } else {
        console.error('Unknown error occurred during closing database connection.');
      }
    }
  }
}
main().catch(err => {
  if (err instanceof Error) {
    console.error('Error in main execution:', err.message);
  } else {
    console.error('Unknown error in main execution.');
  }
});
