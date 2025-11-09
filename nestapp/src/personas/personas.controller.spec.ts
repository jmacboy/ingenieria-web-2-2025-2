import { Test, TestingModule } from "@nestjs/testing";
import { PersonasController } from "./personas.controller";
import { PersonasService } from "./personas.service";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";
import { PersonaUpdateDto } from "./dtos/persona-update.dto";

describe("PersonasController", () => {
    let controller: PersonasController;

    const mockPersonasService = {
        getAll: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PersonasController],
            providers: [
                {
                    provide: PersonasService,
                    useValue: mockPersonasService,
                },
            ],
        }).compile();

        controller = module.get<PersonasController>(PersonasController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("findAll", () => {
        it("should return all personas", () => {
            const result = [{ id: 1, nombre: "Test", apellido: "User" }];
            mockPersonasService.getAll.mockReturnValue(result);

            expect(controller.findAll()).toBe(result);
            expect(mockPersonasService.getAll).toHaveBeenCalled();
        });
    });

    describe("findOne", () => {
        it("should return the id", () => {
            const id = 5;
            expect(controller.findOne(id)).toBe(id);
        });
    });

    describe("create", () => {
        it("should create a persona", () => {
            const dto: PersonaInsertDto = { nombre: "John", apellido: "Doe" } as PersonaInsertDto;
            const result = { id: 1, ...dto };
            mockPersonasService.create.mockReturnValue(result);

            expect(controller.create(dto)).toBe(result);
        });
    });

    describe("update", () => {
        it("should return apellido", () => {
            const dto: PersonaUpdateDto = { apellido: "Smith" } as PersonaUpdateDto;
            expect(controller.update(1, dto)).toBe("Smith");
        });
    });

    describe("partialUpdate", () => {
        it("should return apellido", () => {
            const dto: PersonaUpdateDto = { apellido: "Jones" } as PersonaUpdateDto;
            expect(controller.partialUpdate(1, dto)).toBe("Jones");
        });
    });

    describe("delete", () => {
        it("should return deletion message", () => {
            const id = 1;
            expect(controller.delete(id)).toBe("Persona con id: 1 eliminado");
        });
    });
});
