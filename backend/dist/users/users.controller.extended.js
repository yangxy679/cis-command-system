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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersControllerExtended = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_extended_1 = require("./users.service.extended");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let UsersControllerExtended = class UsersControllerExtended {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(query) {
        return this.usersService.findAll(query);
    }
    async getStatistics() {
        return this.usersService.getStatistics();
    }
    async searchUsers(keyword, limit) {
        return this.usersService.searchUsers(keyword, limit);
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async updateProfile(id, updateProfileDto) {
        return this.usersService.updateProfile(id, updateProfileDto);
    }
    async changeStatus(id, changeStatusDto) {
        return this.usersService.changeStatus(id, changeStatusDto);
    }
    async assignRoles(id, assignRolesDto) {
        return this.usersService.assignRoles(id, assignRolesDto);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
    async getCurrentUserProfile(id) {
        return this.usersService.findOne(id);
    }
};
exports.UsersControllerExtended = UsersControllerExtended;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, swagger_1.ApiOperation)({ summary: '获取用户列表' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: '搜索关键词' }),
    (0, swagger_1.ApiQuery)({ name: 'department', required: false, description: '部门筛选' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: '是否激活' }),
    (0, swagger_1.ApiQuery)({ name: 'roleId', required: false, description: '角色ID筛选' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '页码', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: '每页数量', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, description: '排序字段' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, description: '排序方向', enum: ['ASC', 'DESC'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回用户列表' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '未授权访问' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '权限不足' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UserQueryDto]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, swagger_1.ApiOperation)({ summary: '获取用户统计信息' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回用户统计信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: '搜索用户' }),
    (0, swagger_1.ApiQuery)({ name: 'keyword', required: true, description: '搜索关键词' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: '返回数量限制', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回搜索结果' }),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, swagger_1.ApiOperation)({ summary: '获取用户详情' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回用户详情' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, swagger_1.ApiOperation)({ summary: '创建用户' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '用户创建成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '请求参数错误' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '用户名或邮箱已存在' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof update_user_dto_1.CreateUserDto !== "undefined" && update_user_dto_1.CreateUserDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, swagger_1.ApiOperation)({ summary: '更新用户信息' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '用户更新成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '请求参数错误' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/profile'),
    (0, swagger_1.ApiOperation)({ summary: '更新用户个人资料' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '个人资料更新成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, swagger_1.ApiOperation)({ summary: '更改用户状态' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '用户状态更新成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.ChangeUserStatusDto]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Put)(':id/roles'),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, swagger_1.ApiOperation)({ summary: '分配用户角色' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '角色分配成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.AssignRolesDto]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "assignRoles", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'system-admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: '删除用户' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: '用户删除成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '系统用户不能删除' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('me/profile'),
    (0, swagger_1.ApiOperation)({ summary: '获取当前用户资料' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回当前用户资料' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersControllerExtended.prototype, "getCurrentUserProfile", null);
exports.UsersControllerExtended = UsersControllerExtended = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_extended_1.UsersServiceExtended])
], UsersControllerExtended);
//# sourceMappingURL=users.controller.extended.js.map