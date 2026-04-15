import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(loginDto: LoginUserDto): Promise<any>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any>;
    getProfile(req: any): Promise<any>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<any>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<any>;
    logout(req: any): Promise<{
        message: string;
        timestamp: string;
    }>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
        timestamp: string;
    }>;
    healthCheck(): Promise<{
        status: string;
        service: string;
        timestamp: string;
        version: string;
    }>;
}
