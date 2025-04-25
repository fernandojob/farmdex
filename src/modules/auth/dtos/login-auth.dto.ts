import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @ApiProperty({ example: 'usuarioDoc@email.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'senha123' })
  password: string;
}
