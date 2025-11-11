import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class PersonaUpdateDto {
    @IsString()
    @MinLength(2)
    @IsOptional()
    readonly nombre: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    readonly apellido: string;

    @IsNumber()
    @IsOptional()
    readonly edad: number;
}
