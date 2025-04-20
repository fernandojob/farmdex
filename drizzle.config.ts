import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'postgres',
    port: 5432,
    user: 'farmdex_user',
    password: 'farmdex_pass',
    database: 'farmdex',
  },
} satisfies Config;
