import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/role.entity';
import { UpdateUserDto, ChangeUserStatusDto, AssignRolesDto, UserQueryDto, UpdateUserProfileDto } from './dto/update-user.dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
export declare class UsersServiceExtended {
    private usersRepository;
    private rolesRepository;
    constructor(usersRepository: Repository<User>, rolesRepository: Repository<Role>);
    findAll(query: UserQueryDto): Promise<{
        data: User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateProfile(id: string, updateProfileDto: UpdateUserProfileDto): Promise<User>;
    changeStatus(id: string, changeStatusDto: ChangeUserStatusDto): Promise<User>;
    assignRoles(id: string, assignRolesDto: AssignRolesDto): Promise<User>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        verified: number;
        inactive: number;
        departmentStats: any[];
        recentRegistrations: number;
    }>;
    searchUsers(keyword: string, limit?: number): Promise<User[]>;
}
