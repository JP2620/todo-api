import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}
