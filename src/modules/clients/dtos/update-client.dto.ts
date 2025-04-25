import { IsOptional, IsString, IsEmail, IsDate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Fernando Nunes' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'novoemail@email.com' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '987.654.321-00' })
  cpf?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional({ example: '1996-01-01' })
  birthDate?: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '(21) 99999-0000' })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '22000-000' })
  zipCode?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Brasil' })
  country?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'RJ' })
  state?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Niterói' })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Avenida Central' })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '456' })
  number?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Casa 2' })
  complement?: string;
}
