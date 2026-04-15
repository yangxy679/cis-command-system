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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_service_1 = require("./roles.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async findAll(query) {
        return this.rolesService.findAll(query);
    }
    async getStatistics() {
        return this.rolesService.getStatistics();
    }
    async getAllPermissions() {
        return this.rolesService.getAllPermissions();
    }
    async initializeSystemRoles() {
        return this.rolesService.initializeSystemRoles();
    }
    async findOne(id) {
        return this.rolesService.findOne(id);
    }
    async create(createRoleDto) {
        return this.rolesService.create(createRoleDto);
    }
    async update(id, updateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }
    async addPermission(id, permission) {
        return this.rolesService.addPermission(id, permission);
    }
    async removePermission(id, permission) {
        return this.rolesService.removePermission(id, permission);
    }
    async remove(id) {
        return this.rolesService.remove(id);
    }
    async hasPermission(id, permission) {
        const hasPermission = await this.rolesService.hasPermission(id, permission);
        return { hasPermission };
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '获取角色列表' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: '搜索关键词' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '页码', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: '每页数量', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, description: '排序字段' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, description: '排序方向', enum: ['ASC', 'DESC'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回角色列表' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '未授权访问' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '权限不足' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '获取角色统计信息' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回角色统计信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('permissions'),
    (0, swagger_1.ApiOperation)({ summary: '获取所有权限列表' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回权限列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAllPermissions", null);
__decorate([
    (0, common_1.Get)('initialize-system'),
    (0, roles_decorator_1.Roles)('super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '初始化系统角色' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '系统角色初始化完成' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '需要超级管理员权限' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "initializeSystemRoles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '获取角色详情' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回角色详情' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '角色不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '创建角色' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '角色创建成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '请求参数错误' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '角色名已存在' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '更新角色信息' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '角色更新成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '角色不存在' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '请求参数错误' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/permissions/add'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '为角色添加权限' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '权限添加成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '角色不存在' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '无效的权限' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('permission')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "addPermission", null);
__decorate([
    (0, common_1.Put)(':id/permissions/remove'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '从角色移除权限' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '权限移除成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '角色不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('permission')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "removePermission", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: '删除角色' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '角色删除成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '角色不存在' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '系统角色不能删除或角色已被使用' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/has-permission/:permission'),
    (0, swagger_1.ApiOperation)({ summary: '检查角色是否有特定权限' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回检查结果' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '角色不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('permission')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "hasPermission", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('roles'),
    (0, common_1.Controller)('roles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map