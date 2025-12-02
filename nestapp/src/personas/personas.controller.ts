import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";
import { PersonaUpdateDto } from "./dtos/persona-update.dto";
import { PersonasService } from "./personas.service";
import { AuthGuard } from "../auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { promisify } from "util";
import { unlink } from "fs";
const unlinkAsync = promisify(unlink);

@Controller("personas")
export class PersonasController {
    // Para hacer la inyección de dependencias, en el constructor
    // agrego el servicio a utilizar
    constructor(private personaService: PersonasService) {}

    @UseGuards(AuthGuard)
    @Get("")
    findAll() {
        return this.personaService.getAll();
    }
    @UseGuards(AuthGuard)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
        return await this.personaService.getById(id);
    }
    @UseGuards(AuthGuard)
    @Post("")
    create(@Body() createPersonaDto: PersonaInsertDto) {
        return this.personaService.create(createPersonaDto);
    }
    @UseGuards(AuthGuard)
    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() updatePersonaDto: PersonaInsertDto) {
        return this.personaService.update(id, updatePersonaDto);
    }
    @UseGuards(AuthGuard)
    @Patch(":id")
    async partialUpdate(@Param("id", ParseIntPipe) id: number, @Body() updatePersonaDto: PersonaUpdateDto) {
        return this.personaService.update(id, updatePersonaDto);
    }
    @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return this.personaService.delete(id);
    }
    @UseGuards(AuthGuard)
    @Post(":id/profile")
    @UseInterceptors(FileInterceptor("image"))
    async uploadFile(@Param("id") idPersona: number, @UploadedFile() image: Express.Multer.File) {
        console.log("Uploading file for persona with ID:", idPersona);
        const persona = await this.personaService.getById(idPersona);
        if (!persona) {
            if (image) {
                await unlinkAsync(image.path);
            }
            throw new NotFoundException("Persona not found");
        }
        console.log("Uploaded file:", image);
        return {
            filename: image.filename,
            path: image.path,
        };
    }
}
