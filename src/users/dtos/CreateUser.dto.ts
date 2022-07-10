import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @MinLength(2)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
