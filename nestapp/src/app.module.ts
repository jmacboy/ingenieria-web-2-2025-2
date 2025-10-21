import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PruebaController } from "./prueba/prueba.controller";

@Module({
    imports: [],
    controllers: [AppController, PruebaController],
    providers: [AppService],
})
export class AppModule {}
