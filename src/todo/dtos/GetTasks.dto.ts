import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class GetTasksDto {
    @IsNotEmpty()
    @IsString()
    folder: string;

    @IsNotEmpty()
    @IsString()
    owner: string;
}