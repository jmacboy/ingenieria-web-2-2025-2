import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("varchar", {
        nullable: false,
    })
    nombre: string;
    @Column()
    apellido: string;
    @Column("int", {
        default: 1,
    })
    edad: number;
}
