import { Injectable } from "@nestjs/common";
import { Persona } from "./models/persona.model";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";

@Injectable()
export class PersonasService {
    private readonly personas: Persona[] = [];

    create(persona: PersonaInsertDto): Persona {
        const newPersona: Persona = {
            id: this.personas.length + 1,
            ...persona,
        };
        this.personas.push(newPersona);
        return newPersona;
    }

    getAll(): Persona[] {
        return this.personas;
    }
}
