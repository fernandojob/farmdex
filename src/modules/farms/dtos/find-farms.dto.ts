import { IsOptional, IsInt, Min, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SortOrder, SortableFarmFields } from '../types/sortable-farm-fields';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindFarmsDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({ example: 'Boa Esperança' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: SortableFarmFields, example: SortableFarmFields.name })
  @IsOptional()
  @IsEnum(SortableFarmFields)
  sortBy: SortableFarmFields = SortableFarmFields.name;

  @ApiPropertyOptional({ enum: SortOrder, example: SortOrder.desc })
  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.desc;
}
