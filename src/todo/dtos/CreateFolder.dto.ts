import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}
