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
exports.Statistics = exports.StatisticsType = void 0;
const typeorm_1 = require("typeorm");
var StatisticsType;
(function (StatisticsType) {
    StatisticsType["SYSTEM_USAGE"] = "system_usage";
    StatisticsType["USER_ACTIVITY"] = "user_activity";
    StatisticsType["MISSION_PERFORMANCE"] = "mission_performance";
    StatisticsType["UNIT_READINESS"] = "unit_readiness";
    StatisticsType["COST_ANALYSIS"] = "cost_analysis";
    StatisticsType["RISK_ASSESSMENT"] = "risk_assessment";
})(StatisticsType || (exports.StatisticsType = StatisticsType = {}));
let Statistics = class Statistics {
    getTypeDisplayName() {
        const typeNames = {
            [StatisticsType.SYSTEM_USAGE]: '系统使用统计',
            [StatisticsType.USER_ACTIVITY]: '用户活动统计',
            [StatisticsType.MISSION_PERFORMANCE]: '任务性能统计',
            [StatisticsType.UNIT_READINESS]: '单位战备统计',
            [StatisticsType.COST_ANALYSIS]: '成本分析统计',
            [StatisticsType.RISK_ASSESSMENT]: '风险评估统计',
        };
        return typeNames[this.type];
    }
    getPeriodDisplay() {
        const start = new Date(this.periodStart);
        const end = new Date(this.periodEnd);
        const formatDate = (date) => {
            return date.toLocaleDateString('zh-CN');
        };
        return `${formatDate(start)} 至 ${formatDate(end)}`;
    }
    getSummary() {
        switch (this.type) {
            case StatisticsType.SYSTEM_USAGE:
                return `系统使用统计：${this.data.totalUsers || 0} 用户，${this.data.totalMissions || 0} 任务`;
            case StatisticsType.USER_ACTIVITY:
                return `用户活动统计：${this.data.activeUsers || 0} 活跃用户`;
            case StatisticsType.MISSION_PERFORMANCE:
                return `任务性能统计：成功率 ${this.data.successRate || 0}%`;
            case StatisticsType.UNIT_READINESS:
                return `单位战备统计：平均战备率 ${this.data.averageReadiness || 0}%`;
            case StatisticsType.COST_ANALYSIS:
                return `成本分析统计：总成本 ${this.data.totalCost || 0} 元`;
            case StatisticsType.RISK_ASSESSMENT:
                return `风险评估统计：${this.data.highRisks || 0} 个高风险`;
            default:
                return '统计摘要';
        }
    }
};
exports.Statistics = Statistics;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Statistics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatisticsType,
    }),
    __metadata("design:type", String)
], Statistics.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], Statistics.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Statistics.prototype, "periodStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Statistics.prototype, "periodEnd", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Statistics.prototype, "createdAt", void 0);
exports.Statistics = Statistics = __decorate([
    (0, typeorm_1.Entity)('statistics')
], Statistics);
//# sourceMappingURL=statistics.entity.js.map