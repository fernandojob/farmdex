import { Module } from '@nestjs/common';
import { ClientsController } from './controllers/clients.controller';
import { ClientsService } from './services/clients.service';
import { ClientsRepository } from './repositories/clients.repository';
import { DrizzleClientsRepository } from './repositories/drizzle-clients.repository';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: ClientsRepository,
      useClass: DrizzleClientsRepository,
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
