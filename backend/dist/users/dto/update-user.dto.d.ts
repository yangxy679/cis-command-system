import { UserRole, UserStatus } from '../../auth/entities/user.entity';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    fullName?: string;
    department?: string;
    rank?: string;
    role?: UserRole;
    status?: UserStatus;
    phone?: string;
    position?: string;
    notes?: string;
}
