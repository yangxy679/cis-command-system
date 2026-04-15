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
exports.UsersControllerSimple = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_simple_1 = require("./users.service.simple");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UsersControllerSimple = class UsersControllerSimple {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(query) {
        return this.usersService.findAll(query);
    }
    async getStatistics() {
        return this.usersService.getStatistics();
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
    async remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersControllerSimple = UsersControllerSimple;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取用户列表' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: '搜索关键词' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '页码', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: '每页数量', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, description: '排序字段' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, description: '排序方向', enum: ['ASC', 'DESC'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回用户列表' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '未授权访问' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersControllerSimple.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: '获取用户统计信息' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回用户统计信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersControllerSimple.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取用户详情' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回用户详情' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersControllerSimple.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建用户' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '用户创建成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '请求参数错误' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '用户名或邮箱已存在' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersControllerSimple.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新用户信息' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '用户更新成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '请求参数错误' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersControllerSimple.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除用户' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '用户删除成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersControllerSimple.prototype, "remove", null);
exports.UsersControllerSimple = UsersControllerSimple = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_simple_1.UsersServiceSimple])
], UsersControllerSimple);
//# sourceMappingURL=users.controller.js.map