import { Injectable } from "@nestjs/common";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Persona } from "./entities/persona.entity";

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
}
