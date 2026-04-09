import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, TokenResponse } from './interfaces/jwt-payload.interface';
export declare class AuthServiceImplementation implements AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerUserDto: RegisterUserDto): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<any>;
    private generateTokens;
    refreshToken(refreshToken: string): Promise<TokenResponse>;
    validateUser(payload: JwtPayload): Promise<any>;
    logout(userId: string): Promise<void>;
}
