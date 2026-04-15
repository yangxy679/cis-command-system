import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
export declare class UsersServiceSimple {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(query: any): Promise<{
        data: User[];
        meta: {
            total: number;
            page: any;
            limit: any;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<User>;
    create(createUserDto: any): Promise<User>;
    update(id: string, updateUserDto: any): Promise<User>;
    remove(id: string): Promise<User>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        verified: number;
        inactive: number;
        departmentStats: any[];
        recentRegistrations: number;
    }>;
}
