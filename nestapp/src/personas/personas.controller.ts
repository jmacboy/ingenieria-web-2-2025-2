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
    async findOne(@Param("id", ParseIntPipe) id: number) {
        return await this.personaService.getById(id);
    }
    @Post("")
    create(@Body() createPersonaDto: PersonaInsertDto) {
        return this.personaService.create(createPersonaDto);
    }
    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() updatePersonaDto: PersonaInsertDto) {
        return this.personaService.update(id, updatePersonaDto);
    }
    @Patch(":id")
    async partialUpdate(@Param("id", ParseIntPipe) id: number, @Body() updatePersonaDto: PersonaUpdateDto) {
        return this.personaService.update(id, updatePersonaDto);
    }
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return this.personaService.delete(id);
    }
}
