import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PruebaController } from "./prueba/prueba.controller";
import { PersonasModule } from "./personas/personas.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT ?? "", 10),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true, // entities: [] que llenamos manualmente,
            synchronize: true, //solo mientras estén en desarrollo
        }),
        PersonasModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController, PruebaController],
    providers: [AppService],
})
export class AppModule {}
