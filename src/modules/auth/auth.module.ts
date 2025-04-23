import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DrizzleModule } from '../../database/drizzle.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    DrizzleModule,
    JwtModule.register({
      secret: 'minha-chave-secreta',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
