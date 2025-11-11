import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class PersonaInsertDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    readonly apellido: string;

    @IsNumber()
    @IsNotEmpty()
    readonly edad: number;
}
