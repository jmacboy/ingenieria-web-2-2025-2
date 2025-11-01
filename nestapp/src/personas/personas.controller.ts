import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";
import { PersonaUpdateDto } from "./dtos/persona-update.dto";
import { PersonasService } from "./personas.service";

@Controller("personas")
export class PersonasController {
    // Para hacer la inyección de dependencias, en el constructor
    // agrego el servicio a utilizar
    constructor(private personaService: PersonasService) {}
    @Get("")
    findAll() {
        return this.personaService.getAll();
    }
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        console.log(id + 5);
        return id;
    }
    @Post("")
    create(@Body() createPersonaDto: PersonaInsertDto) {
        return this.personaService.create(createPersonaDto);
    }
    @Put(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() updatePersonaDto: PersonaUpdateDto) {
        return updatePersonaDto.apellido;
    }
    @Patch(":id")
    partialUpdate(@Param("id", ParseIntPipe) id: number, @Body() updatePersonaDto: PersonaUpdateDto) {
        return updatePersonaDto.apellido;
    }
    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number) {
        return "Persona con id: " + id + " eliminado";
    }
}
