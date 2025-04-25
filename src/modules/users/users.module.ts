import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DrizzleModule } from 'src/database/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
