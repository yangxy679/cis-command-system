import { UsersServiceExtended } from './users.service.extended';
import { UpdateUserDto, ChangeUserStatusDto, AssignRolesDto, UserQueryDto, UpdateUserProfileDto, CreateUserDto } from './dto/update-user.dto';
export declare class UsersControllerExtended {
    private readonly usersService;
    constructor(usersService: UsersServiceExtended);
    findAll(query: UserQueryDto): Promise<{
        data: import("../auth/entities/user.entity").User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        verified: number;
        inactive: number;
        departmentStats: any[];
        recentRegistrations: number;
    }>;
    searchUsers(keyword: string, limit: number): Promise<import("../auth/entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../auth/entities/user.entity").User>;
    create(createUserDto: CreateUserDto): Promise<import("../auth/entities/user.entity").User[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../auth/entities/user.entity").User>;
    updateProfile(id: string, updateProfileDto: UpdateUserProfileDto): Promise<import("../auth/entities/user.entity").User>;
    changeStatus(id: string, changeStatusDto: ChangeUserStatusDto): Promise<import("../auth/entities/user.entity").User>;
    assignRoles(id: string, assignRolesDto: AssignRolesDto): Promise<import("../auth/entities/user.entity").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getCurrentUserProfile(id: string): Promise<import("../auth/entities/user.entity").User>;
}
