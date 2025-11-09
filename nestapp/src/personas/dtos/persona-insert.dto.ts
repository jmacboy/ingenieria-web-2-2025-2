import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class PersonaInsertDto {
    @IsString()
    @MinLength(2)
    nombre: string;

    @IsString()
    @MinLength(2)
    apellido: string;

    @IsNumber()
    @IsOptional()
    edad: number;
}
