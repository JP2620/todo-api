import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    old_description: string;

    @IsNotEmpty()
    @IsString()
    new_description: string;

    @IsNotEmpty()
    @IsString()
    folder: string;

    @IsNotEmpty()
    @IsString()
    owner: string;
}