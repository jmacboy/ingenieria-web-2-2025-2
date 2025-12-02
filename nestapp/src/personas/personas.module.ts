import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { PersonasController } from "./personas.controller";
import { PersonasService } from "./personas.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity";
import { UsersModule } from "../users/users.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
    controllers: [PersonasController],
    providers: [PersonasService],
    imports: [
        TypeOrmModule.forFeature([Persona]),
        UsersModule,
        MulterModule.register({
            storage: diskStorage({
                destination: "./uploads", // Directorio donde se guardarán los archivos
                filename: (req, file, callback) => {
                    console.log("Entró a filename");
                    const idSuffix = req.params.id;
                    const extension = file.originalname.split(".").pop();
                    //aceptar solo jpg
                    if (extension !== "jpg") {
                        callback(new HttpException("Only jpg files allowed", HttpStatus.BAD_REQUEST), "");
                    }

                    const filename = idSuffix + "." + extension;
                    callback(null, filename);
                },
            }),
        }),
    ],
})
export class PersonasModule {}
