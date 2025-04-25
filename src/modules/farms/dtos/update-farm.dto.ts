import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFarmDto {
  @ApiPropertyOptional({ example: 'Fazenda Nova Era' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 180 })
  @IsOptional()
  @IsNumber()
  totalArea?: number;

  @ApiPropertyOptional({ example: 6 })
  @IsOptional()
  @IsNumber()
  plotCount?: number;

  @ApiPropertyOptional({ example: '2021-01-01' })
  @IsOptional()
  @IsDateString()
  foundationDate?: string;
}
