import { Module } from '@nestjs/common';
import { FarmsController } from './controllers/farms.controller';
import { FarmsService } from './services/farms.service';
import { DrizzleModule } from 'src/database/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [FarmsController],
  providers: [FarmsService],
})
export class FarmsModule {}
