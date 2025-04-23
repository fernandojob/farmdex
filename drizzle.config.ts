import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schemas/**/*.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'farmdex',
    ssl: false,
  },
} satisfies Config;
