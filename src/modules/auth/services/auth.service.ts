import { Inject, Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegisterAuthDto } from '../dtos/register-auth.dto';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterAuthDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create(dto.email, hashedPassword);

    const { password, ...result } = user;
    return result;
  }

  async login(dto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  async validateUser(userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) return null;

    const { password, ...result } = user;
    return result;
  }
}
