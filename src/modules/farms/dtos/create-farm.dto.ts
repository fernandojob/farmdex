import { IsInt, IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  totalArea: number;

  @IsInt()
  @IsNotEmpty()
  plotCount: number;

  @IsDateString()
  @IsNotEmpty()
  foundationDate: string;

  @IsInt()
  @IsNotEmpty()
  clientId: number;
}
