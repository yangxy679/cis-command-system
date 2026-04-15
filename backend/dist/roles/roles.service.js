"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const permissions_enum_1 = require("./enums/permissions.enum");
let RolesService = class RolesService {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async findAll(query) {
        const { search, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'DESC', } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.name = (0, typeorm_2.Like)(`%${search}%`);
        }
        const [roles, total] = await this.rolesRepository.findAndCount({
            where,
            order: { [sortBy]: sortOrder },
            skip,
            take: limit,
        });
        return {
            data: roles,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const role = await this.rolesRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`角色 ${id} 不存在`);
        }
        return role;
    }
    async findByName(name) {
        return this.rolesRepository.findOne({
            where: { name },
        });
    }
    async create(createRoleDto) {
        const { name, description, permissions, isActive = true } = createRoleDto;
        const existingRole = await this.rolesRepository.findOne({
            where: { name },
        });
        if (existingRole) {
            throw new common_1.BadRequestException('角色名已存在');
        }
        const validPermissions = this.validatePermissions(permissions);
        const role = this.rolesRepository.create({
            name,
            description,
            permissions: validPermissions,
            isActive,
            isSystem: false,
            priority: 100,
        });
        return this.rolesRepository.save(role);
    }
    async update(id, updateRoleDto) {
        const role = await this.findOne(id);
        if (role.isSystem) {
            throw new common_1.BadRequestException('系统角色不能修改');
        }
        if (updateRoleDto.name !== undefined && updateRoleDto.name !== role.name) {
            const existingRole = await this.rolesRepository.findOne({
                where: { name: updateRoleDto.name },
            });
            if (existingRole && existingRole.id !== id) {
                throw new common_1.BadRequestException('角色名已被其他角色使用');
            }
            role.name = updateRoleDto.name;
        }
        if (updateRoleDto.description !== undefined)
            role.description = updateRoleDto.description;
        if (updateRoleDto.isActive !== undefined)
            role.isActive = updateRoleDto.isActive;
        if (updateRoleDto.priority !== undefined)
            role.priority = updateRoleDto.priority;
        if (updateRoleDto.permissions !== undefined) {
            role.permissions = this.validatePermissions(updateRoleDto.permissions);
        }
        return this.rolesRepository.save(role);
    }
    async remove(id) {
        const role = await this.findOne(id);
        if (role.isSystem) {
            throw new common_1.BadRequestException('系统角色不能删除');
        }
        if (role.users && role.users.length > 0) {
            throw new common_1.BadRequestException('该角色已被用户使用，不能删除');
        }
        return this.rolesRepository.remove(role);
    }
    async getStatistics() {
        const totalRoles = await this.rolesRepository.count();
        const activeRoles = await this.rolesRepository.count({ where: { isActive: true } });
        const systemRoles = await this.rolesRepository.count({ where: { isSystem: true } });
        return {
            total: totalRoles,
            active: activeRoles,
            system: systemRoles,
            custom: totalRoles - systemRoles,
        };
    }
    async initializeSystemRoles() {
        const systemRoles = [
            {
                name: 'SUPER_ADMIN',
                description: '超级管理员',
                permissions: permissions_enum_1.RolePermissions.SUPER_ADMIN,
                isSystem: true,
                priority: 1,
            },
            {
                name: 'ADMIN',
                description: '管理员',
                permissions: permissions_enum_1.RolePermissions.ADMIN,
                isSystem: true,
                priority: 10,
            },
            {
                name: 'COMMANDER',
                description: '指挥员',
                permissions: permissions_enum_1.RolePermissions.COMMANDER,
                isSystem: true,
                priority: 20,
            },
            {
                name: 'OPERATOR',
                description: '操作员',
                permissions: permissions_enum_1.RolePermissions.OPERATOR,
                isSystem: true,
                priority: 30,
            },
            {
                name: 'OBSERVER',
                description: '观察员',
                permissions: permissions_enum_1.RolePermissions.OBSERVER,
                isSystem: true,
                priority: 40,
            },
            {
                name: 'GUEST',
                description: '访客',
                permissions: permissions_enum_1.RolePermissions.GUEST,
                isSystem: true,
                priority: 50,
            },
        ];
        for (const roleData of systemRoles) {
            const existingRole = await this.findByName(roleData.name);
            if (!existingRole) {
                const role = this.rolesRepository.create(roleData);
                await this.rolesRepository.save(role);
            }
        }
        return { message: '系统角色初始化完成' };
    }
    validatePermissions(permissions) {
        if (!permissions || !Array.isArray(permissions)) {
            return [];
        }
        const allPermissions = Object.values(permissions_enum_1.Permissions);
        return permissions.filter(permission => allPermissions.includes(permission));
    }
    getAllPermissions() {
        return {
            permissions: Object.values(permissions_enum_1.Permissions),
            groups: PermissionGroups,
            rolePermissions: permissions_enum_1.RolePermissions,
        };
    }
    async hasPermission(roleId, permission) {
        const role = await this.findOne(roleId);
        return role.hasPermission(permission);
    }
    async addPermission(roleId, permission) {
        const role = await this.findOne(roleId);
        if (role.isSystem) {
            throw new common_1.BadRequestException('系统角色的权限不能修改');
        }
        const allPermissions = Object.values(permissions_enum_1.Permissions);
        if (!allPermissions.includes(permission)) {
            throw new common_1.BadRequestException(`无效的权限: ${permission}`);
        }
        role.addPermission(permission);
        return this.rolesRepository.save(role);
    }
    async removePermission(roleId, permission) {
        const role = await this.findOne(roleId);
        if (role.isSystem) {
            throw new common_1.BadRequestException('系统角色的权限不能修改');
        }
        role.removePermission(permission);
        return this.rolesRepository.save(role);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map