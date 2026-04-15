import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: string;
    email: string;
    username: string;
    password: string;
    fullName: string;
    isActive: boolean;
    lastLoginAt: Date;
    loginCount: number;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    hasRole(roleName: string): boolean;
    hasPermission(permission: string): boolean;
    getAllPermissions(): string[];
}
