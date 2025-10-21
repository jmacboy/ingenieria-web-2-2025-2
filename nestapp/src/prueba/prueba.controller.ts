import { Controller, Get } from "@nestjs/common";

@Controller("prueba")
export class PruebaController {
    @Get("/hola")
    getTest(): string {
        return "Esto también es un saludo";
    }
}
