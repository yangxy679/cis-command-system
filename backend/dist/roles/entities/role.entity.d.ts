import { User } from '../../auth/entities/user.entity';
export declare class Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    isActive: boolean;
    isSystem: boolean;
    priority: number;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    hasPermission(permission: string): boolean;
    addPermission(permission: string): void;
    removePermission(permission: string): void;
}
