import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(query: any): Promise<{
        data: import("./entities/role.entity").Role[];
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
        system: number;
        custom: number;
    }>;
    getAllPermissions(): Promise<{
        permissions: import("./enums/permissions.enum").Permissions[];
        groups: any;
        rolePermissions: {
            SUPER_ADMIN: import("./enums/permissions.enum").Permissions[];
            ADMIN: import("./enums/permissions.enum").Permissions[];
            COMMANDER: import("./enums/permissions.enum").Permissions[];
            OPERATOR: import("./enums/permissions.enum").Permissions[];
            OBSERVER: import("./enums/permissions.enum").Permissions[];
            GUEST: import("./enums/permissions.enum").Permissions[];
        };
    }>;
    initializeSystemRoles(): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<import("./entities/role.entity").Role>;
    create(createRoleDto: any): Promise<import("./entities/role.entity").Role>;
    update(id: string, updateRoleDto: any): Promise<import("./entities/role.entity").Role>;
    addPermission(id: string, permission: string): Promise<import("./entities/role.entity").Role>;
    removePermission(id: string, permission: string): Promise<import("./entities/role.entity").Role>;
    remove(id: string): Promise<import("./entities/role.entity").Role>;
    hasPermission(id: string, permission: string): Promise<{
        hasPermission: boolean;
    }>;
}
