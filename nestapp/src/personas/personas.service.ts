import { Injectable, NotFoundException } from "@nestjs/common";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Persona } from "./entities/persona.entity";
import { PersonaUpdateDto } from "./dtos/persona-update.dto";

@Injectable()
export class PersonasService {
    constructor(
        @InjectRepository(Persona)
        private readonly personasRepository: Repository<Persona>,
    ) {}

    create(persona: PersonaInsertDto): Promise<Persona> {
        const newPersona: Persona = {
            id: 0,
            ...persona,
        };
        return this.personasRepository.save(newPersona);
    }

    getAll(): Promise<Persona[]> {
        return this.personasRepository.find();
    }
    async getById(id: number): Promise<Persona> {
        const persona = await this.personasRepository.findOneBy({ id });
        if (!persona) {
            throw new NotFoundException();
        }
        return persona;
    }
    async update(id: number, personaUpdate: PersonaUpdateDto): Promise<Persona | null> {
        await this.getById(id);
        const updatedPersona: Persona = {
            id,
            ...personaUpdate,
        };
        await this.personasRepository.update(id, updatedPersona);
        return this.personasRepository.findOneBy({ id });
    }
    async delete(id: number): Promise<void> {
        await this.getById(id);
        await this.personasRepository.delete(id);
    }
}
