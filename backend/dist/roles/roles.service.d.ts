import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permissions } from './enums/permissions.enum';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    findAll(query: any): Promise<{
        data: Role[];
        meta: {
            total: number;
            page: any;
            limit: any;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<Role>;
    findByName(name: string): Promise<Role>;
    create(createRoleDto: any): Promise<Role>;
    update(id: string, updateRoleDto: any): Promise<Role>;
    remove(id: string): Promise<Role>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        system: number;
        custom: number;
    }>;
    initializeSystemRoles(): Promise<{
        message: string;
    }>;
    private validatePermissions;
    getAllPermissions(): {
        permissions: Permissions[];
        groups: any;
        rolePermissions: {
            SUPER_ADMIN: Permissions[];
            ADMIN: Permissions[];
            COMMANDER: Permissions[];
            OPERATOR: Permissions[];
            OBSERVER: Permissions[];
            GUEST: Permissions[];
        };
    };
    hasPermission(roleId: string, permission: string): Promise<boolean>;
    addPermission(roleId: string, permission: string): Promise<Role>;
    removePermission(roleId: string, permission: string): Promise<Role>;
}
