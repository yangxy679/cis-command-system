import { Role } from './role.entity';
export declare class UserExtended {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    rank: string;
    department: string;
    position: string;
    phone: string;
    isActive: boolean;
    isVerified: boolean;
    lastLoginAt: Date;
    lastLoginIp: string;
    loginCount: number;
    preferences: Record<string, any>;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    get displayName(): string;
    get roleNames(): string[];
    hasRole(roleName: string): boolean;
    hasPermission(permission: string): boolean;
}
