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
exports.MissionProgress = exports.ProgressType = void 0;
const typeorm_1 = require("typeorm");
const mission_entity_1 = require("./mission.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
var ProgressType;
(function (ProgressType) {
    ProgressType["STATUS_CHANGE"] = "status_change";
    ProgressType["MILESTONE_COMPLETE"] = "milestone_complete";
    ProgressType["COMMENT"] = "comment";
    ProgressType["ATTACHMENT"] = "attachment";
    ProgressType["RISK_UPDATE"] = "risk_update";
    ProgressType["COST_UPDATE"] = "cost_update";
    ProgressType["SCHEDULE_UPDATE"] = "schedule_update";
    ProgressType["OTHER"] = "other";
})(ProgressType || (exports.ProgressType = ProgressType = {}));
let MissionProgress = class MissionProgress {
    getTypeDisplayName() {
        const typeNames = {
            [ProgressType.STATUS_CHANGE]: '状态变更',
            [ProgressType.MILESTONE_COMPLETE]: '里程碑完成',
            [ProgressType.COMMENT]: '评论',
            [ProgressType.ATTACHMENT]: '附件',
            [ProgressType.RISK_UPDATE]: '风险更新',
            [ProgressType.COST_UPDATE]: '成本更新',
            [ProgressType.SCHEDULE_UPDATE]: '进度更新',
            [ProgressType.OTHER]: '其他',
        };
        return typeNames[this.type];
    }
    getDisplayContent() {
        switch (this.type) {
            case ProgressType.STATUS_CHANGE:
                const { from, to } = this.metadata || {};
                return `任务状态从"${from}"变更为"${to}"`;
            case ProgressType.MILESTONE_COMPLETE:
                const { milestoneName } = this.metadata || {};
                return `完成里程碑: ${milestoneName}`;
            case ProgressType.RISK_UPDATE:
                const { riskDescription } = this.metadata || {};
                return `更新风险: ${riskDescription}`;
            case ProgressType.COST_UPDATE:
                const { oldCost, newCost } = this.metadata || {};
                return `成本从 ${oldCost} 更新为 ${newCost}`;
            case ProgressType.SCHEDULE_UPDATE:
                const { oldDate, newDate } = this.metadata || {};
                return `计划时间从 ${oldDate} 更新为 ${newDate}`;
            default:
                return this.content;
        }
    }
};
exports.MissionProgress = MissionProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MissionProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MissionProgress.prototype, "missionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mission_entity_1.Mission),
    (0, typeorm_1.JoinColumn)({ name: 'missionId' }),
    __metadata("design:type", mission_entity_1.Mission)
], MissionProgress.prototype, "mission", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProgressType,
        default: ProgressType.COMMENT,
    }),
    __metadata("design:type", String)
], MissionProgress.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MissionProgress.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MissionProgress.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MissionProgress.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], MissionProgress.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MissionProgress.prototype, "createdAt", void 0);
exports.MissionProgress = MissionProgress = __decorate([
    (0, typeorm_1.Entity)('mission_progress')
], MissionProgress);
//# sourceMappingURL=mission-progress.entity.js.map