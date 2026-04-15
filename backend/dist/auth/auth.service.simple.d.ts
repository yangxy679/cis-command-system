import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class AuthServiceSimple {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            email: any;
            fullName: any;
        };
    }>;
    register(username: string, password: string, email?: string, fullName?: string): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            email: any;
            fullName: any;
        };
    }>;
}
