import { IsInt, IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {
  @ApiProperty({ example: 'Fazenda Boa Esperança' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10000 })
  @IsInt()
  @IsNotEmpty()
  totalArea: number;

  @ApiProperty({ example: 12 })
  @IsInt()
  @IsNotEmpty()
  plotCount: number;

  @ApiProperty({ example: '2020-08-15' })
  @IsDateString()
  @IsNotEmpty()
  foundationDate: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  clientId: number;
}
