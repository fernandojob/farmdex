import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useFactory: async (config: ConfigService) => {
        const connectionString = config.get<string>('DATABASE_URL');
        const client = new Client({ connectionString });
        await client.connect();
        return drizzle(client, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE'],
})
export class DrizzleModule {}
