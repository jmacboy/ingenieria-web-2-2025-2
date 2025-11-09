import { Module } from "@nestjs/common";
import { PersonasController } from "./personas.controller";
import { PersonasService } from "./personas.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity";

@Module({
    controllers: [PersonasController],
    providers: [PersonasService],
    imports: [TypeOrmModule.forFeature([Persona])],
})
export class PersonasModule {}
