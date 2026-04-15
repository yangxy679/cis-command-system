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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboardStats() {
        return this.dashboardService.getDashboardStats();
    }
    async getRealTimeMetrics() {
        return this.dashboardService.getRealTimeMetrics();
    }
    async getSystemHealth() {
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            services: {
                database: { status: 'up', responseTime: 15 },
                cache: { status: 'up', responseTime: 5 },
                auth: { status: 'up', responseTime: 10 },
                api: { status: 'up', responseTime: 20 },
            },
            metrics: {
                cpu: 35.5,
                memory: 62.3,
                disk: 45.8,
                network: 28.7,
            },
        };
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: '获取仪表板统计数据' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回仪表板统计数据' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '未授权访问' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('metrics/realtime'),
    (0, swagger_1.ApiOperation)({ summary: '获取实时性能指标' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回实时性能指标' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '未授权访问' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRealTimeMetrics", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: '获取系统健康状态' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '返回系统健康状态' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getSystemHealth", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map