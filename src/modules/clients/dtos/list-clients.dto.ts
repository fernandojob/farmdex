import { IsOptional, IsInt, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListClientsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiPropertyOptional({ example: 1 })
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiPropertyOptional({ example: 10 })
  limit = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'name' })
  orderBy = 'name';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiPropertyOptional({ example: 'asc', enum: ['asc', 'desc'] })
  order: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Fernando' })
  name?: string;
}
