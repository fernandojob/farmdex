import { Global, Module } from '@nestjs/common';
import { db } from './config';

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useValue: db,
    },
  ],
  exports: ['DRIZZLE'],
})
export class DrizzleModule {}
