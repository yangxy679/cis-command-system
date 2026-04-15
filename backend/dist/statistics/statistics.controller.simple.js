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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsControllerSimple = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_simple_1 = require("./statistics.service.simple");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let StatisticsControllerSimple = class StatisticsControllerSimple {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getSystemUsageStatistics() {
        return this.statisticsService.getSystemUsageStatistics();
    }
    async getUserActivityStatistics() {
        return this.statisticsService.getUserActivityStatistics();
    }
    async getMissionPerformanceStatistics() {
        return this.statisticsService.getMissionPerformanceStatistics();
    }
    async getUnitReadinessStatistics() {
        return this.statisticsService.getUnitReadinessStatistics();
    }
    async getCostAnalysisStatistics() {
        return this.statisticsService.getCostAnalysisStatistics();
    }
    async getRiskAssessmentStatistics() {
        return this.statisticsService.getRiskAssessmentStatistics();
    }
    async getComprehensiveReport() {
        return this.statisticsService.getComprehensiveReport();
    }
    async getDashboardStatistics() {
        const [systemUsage, missionPerformance, unitReadiness, costAnalysis,] = await Promise.all([
            this.statisticsService.getSystemUsageStatistics(),
            this.statisticsService.getMissionPerformanceStatistics(),
            this.statisticsService.getUnitReadinessStatistics(),
            this.statisticsService.getCostAnalysisStatistics(),
        ]);
        return {
            systemHealth: {
                activeUsers: systemUsage.users.active,
                activeMissions: systemUsage.missions.active,
                deployedUnits: unitReadiness.readiness.deployed,
                systemUptime: 99.8,
            },
            missionMetrics: {
                successRate: missionPerformance.performance.successRate,
                delayedMissions: missionPerformance.performance.delayed,
                avgCost: missionPerformance.cost.avgActual,
                completionRate: (missionPerformance.performance.completed / missionPerformance.performance.total * 100).toFixed(1),
            },
            unitMetrics: {
                totalUnits: unitReadiness.readiness.totalUnits,
                readinessRate: ((unitReadiness.readiness.standby + unitReadiness.readiness.deployed) / unitReadiness.readiness.totalUnits * 100).toFixed(1),
                avgDeploymentTime: unitReadiness.readiness.avgDeploymentTime,
                maintenanceUnits: unitReadiness.readiness.maintenance,
            },
            costMetrics: {
                totalCost: costAnalysis.summary.totalActual,
                costEfficiency: costAnalysis.costEfficiency.overall,
                costOverrun: costAnalysis.summary.overrunPercentage,
                avgCostPerMission: missionPerformance.cost.avgActual,
            },
            recentActivity: {
                newUsers: systemUsage.users.growth[systemUsage.users.growth.length - 1]?.count || 0,
                newMissions: systemUsage.missions.growth[systemUsage.missions.growth.length - 1]?.count || 0,
                recentDeployments: unitReadiness.deploymentStats.find(d => d.status === 'deployed')?.count || 0,
                completedMissions: missionPerformance.performance.completed,
            },
        };
    }
};
exports.StatisticsControllerSimple = StatisticsControllerSimple;
__decorate([
    (0, common_1.Get)('system-usage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getSystemUsageStatistics", null);
__decorate([
    (0, common_1.Get)('user-activity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getUserActivityStatistics", null);
__decorate([
    (0, common_1.Get)('mission-performance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getMissionPerformanceStatistics", null);
__decorate([
    (0, common_1.Get)('unit-readiness'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getUnitReadinessStatistics", null);
__decorate([
    (0, common_1.Get)('cost-analysis'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getCostAnalysisStatistics", null);
__decorate([
    (0, common_1.Get)('risk-assessment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getRiskAssessmentStatistics", null);
__decorate([
    (0, common_1.Get)('comprehensive-report'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getComprehensiveReport", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsControllerSimple.prototype, "getDashboardStatistics", null);
exports.StatisticsControllerSimple = StatisticsControllerSimple = __decorate([
    (0, common_1.Controller)('statistics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof statistics_service_simple_1.StatisticsServiceSimple !== "undefined" && statistics_service_simple_1.StatisticsServiceSimple) === "function" ? _a : Object])
], StatisticsControllerSimple);
//# sourceMappingURL=statistics.controller.simple.js.map