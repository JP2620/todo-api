import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class DeleteFolderDto {
    @IsNotEmpty()
    @IsString()
    owner: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}