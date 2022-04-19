import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    old_description: string;

    @IsString()
    @IsOptional()
    new_description: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    folder: string;

    @IsNotEmpty()
    @IsString()
    owner: string;
}