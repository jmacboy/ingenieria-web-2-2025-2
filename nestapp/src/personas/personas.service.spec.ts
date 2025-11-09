import { Test, TestingModule } from "@nestjs/testing";
import { PersonasService } from "./personas.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity";

describe("PersonasService", () => {
    let service: PersonasService;

    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PersonasService,
                {
                    provide: getRepositoryToken(Persona),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<PersonasService>(PersonasService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
