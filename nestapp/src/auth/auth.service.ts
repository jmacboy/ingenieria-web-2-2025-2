import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UserLoginDto } from "./dtos/user-login.dto";
import { generateAuthToken, stringToSha1 } from "./crypto.utils";
import { UserRegisterDto } from "./dtos/user-register.dto";
import { UserRegisterResponseDto } from "./dtos/register-response.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async login(body: UserLoginDto): Promise<any> {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const hashedPassword = stringToSha1(body.password);
        if (user.password !== hashedPassword) {
            throw new UnauthorizedException();
        }
        const token = generateAuthToken(user.email);
        //TODO: Almacenar el token o usar JWT para no necesitar almacenarlo
        return { token };
    }
    async register(body: UserRegisterDto): Promise<UserRegisterResponseDto> {
        const user = await this.usersService.findByEmail(body.email);
        if (user) {
            throw new ConflictException("User already exists");
        }
        const hashedPassword = stringToSha1(body.password);
        const newUser = await this.usersService.createUser({
            email: body.email,
            password: hashedPassword,
            fullName: body.fullName,
        });
        return { id: newUser.id, email: newUser.email, fullName: newUser.fullName } as UserRegisterResponseDto;
    }
}
