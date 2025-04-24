import { IsOptional, IsInt, Min, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SortOrder, SortableFarmFields } from '../types/sortable-farm-fields';

export class FindFarmsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(SortableFarmFields)
  sortBy: SortableFarmFields = SortableFarmFields.name;

  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.desc;
}
