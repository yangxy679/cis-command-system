import { UsersServiceSimple } from './users.service.simple';
export declare class UsersControllerSimple {
    private readonly usersService;
    constructor(usersService: UsersServiceSimple);
    findAll(query: any): Promise<{
        data: import("../auth/entities/user.entity").User[];
        meta: {
            total: number;
            page: any;
            limit: any;
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
    findOne(id: string): Promise<import("../auth/entities/user.entity").User>;
    create(createUserDto: any): Promise<import("../auth/entities/user.entity").User>;
    update(id: string, updateUserDto: any): Promise<import("../auth/entities/user.entity").User>;
    remove(id: string): Promise<import("../auth/entities/user.entity").User>;
}
