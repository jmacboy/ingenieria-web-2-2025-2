import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UserLoginDto } from "./dtos/user-login.dto";
import { stringToSha1 } from "./crypto.utils";
import { UserRegisterDto } from "./dtos/user-register.dto";
import { UserRegisterResponseDto } from "./dtos/register-response.dto";
import { JwtService } from "@nestjs/jwt";
import { UserInfoDto } from "./dtos/userinfo-dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(body: UserLoginDto): Promise<any> {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const hashedPassword = stringToSha1(body.password);
        if (user.password !== hashedPassword) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email };
        return {
            token: await this.jwtService.signAsync(payload),
        };
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
    async getUserById(id: number): Promise<UserInfoDto> {
        const user = await this.usersService.findById(id);

        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            // role: user.role
        } as UserInfoDto;
    }
}
