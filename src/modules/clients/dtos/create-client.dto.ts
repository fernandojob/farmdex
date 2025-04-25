import { IsString, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @ApiProperty({ example: 'Fernando Nunes' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'fernando@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '1995-10-15' })
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '(21) 98765-4321' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '21000-000' })
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Brasil' })
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Rio de Janeiro' })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Rio de Janeiro' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Rua Exemplo' })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123' })
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Ap 101' })
  complement: string;
}
