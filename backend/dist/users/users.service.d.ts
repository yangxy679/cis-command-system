import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from '../auth/entities/user.entity';
interface FindAllOptions {
    page: number;
    limit: number;
    department?: string;
    rank?: string;
    status?: string;
}
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(options: FindAllOptions): Promise<{
        data: User[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    activate(id: number): Promise<User>;
    deactivate(id: number): Promise<User>;
    getPermissions(id: number): Promise<string[]>;
    search(keyword: string): Promise<User[]>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    countByDepartment(department: string): Promise<number>;
    countByStatus(status: UserStatus): Promise<number>;
}
export {};
