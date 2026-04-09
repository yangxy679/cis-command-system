import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../auth/entities/user.entity").User>;
    findAll(page?: number, limit?: number, department?: string, rank?: string, status?: string): Promise<{
        data: import("../auth/entities/user.entity").User[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("../auth/entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../auth/entities/user.entity").User>;
    remove(id: string): Promise<void>;
    activate(id: string): Promise<import("../auth/entities/user.entity").User>;
    deactivate(id: string): Promise<import("../auth/entities/user.entity").User>;
    getPermissions(id: string): Promise<string[]>;
    search(keyword: string): Promise<import("../auth/entities/user.entity").User[]>;
}
