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
exports.Mission = exports.MissionType = exports.MissionPriority = exports.MissionStatus = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("../../units/entities/unit.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
var MissionStatus;
(function (MissionStatus) {
    MissionStatus["DRAFT"] = "draft";
    MissionStatus["PLANNED"] = "planned";
    MissionStatus["APPROVED"] = "approved";
    MissionStatus["IN_PROGRESS"] = "in_progress";
    MissionStatus["COMPLETED"] = "completed";
    MissionStatus["CANCELLED"] = "cancelled";
    MissionStatus["DELAYED"] = "delayed";
    MissionStatus["FAILED"] = "failed";
})(MissionStatus || (exports.MissionStatus = MissionStatus = {}));
var MissionPriority;
(function (MissionPriority) {
    MissionPriority["LOW"] = "low";
    MissionPriority["MEDIUM"] = "medium";
    MissionPriority["HIGH"] = "high";
    MissionPriority["CRITICAL"] = "critical";
})(MissionPriority || (exports.MissionPriority = MissionPriority = {}));
var MissionType;
(function (MissionType) {
    MissionType["COMBAT"] = "combat";
    MissionType["TRAINING"] = "training";
    MissionType["PATROL"] = "patrol";
    MissionType["SECURITY"] = "security";
    MissionType["RESCUE"] = "rescue";
    MissionType["LOGISTICS"] = "logistics";
    MissionType["INTELLIGENCE"] = "intelligence";
    MissionType["OTHER"] = "other";
})(MissionType || (exports.MissionType = MissionType = {}));
let Mission = class Mission {
    getStatusDisplayName() {
        const statusNames = {
            [MissionStatus.DRAFT]: '草稿',
            [MissionStatus.PLANNED]: '已计划',
            [MissionStatus.APPROVED]: '已批准',
            [MissionStatus.IN_PROGRESS]: '进行中',
            [MissionStatus.COMPLETED]: '已完成',
            [MissionStatus.CANCELLED]: '已取消',
            [MissionStatus.DELAYED]: '延迟',
            [MissionStatus.FAILED]: '失败',
        };
        return statusNames[this.status];
    }
    getTypeDisplayName() {
        const typeNames = {
            [MissionType.COMBAT]: '作战任务',
            [MissionType.TRAINING]: '训练任务',
            [MissionType.PATROL]: '巡逻任务',
            [MissionType.SECURITY]: '安保任务',
            [MissionType.RESCUE]: '救援任务',
            [MissionType.LOGISTICS]: '后勤任务',
            [MissionType.INTELLIGENCE]: '情报任务',
            [MissionType.OTHER]: '其他任务',
        };
        return typeNames[this.type];
    }
    getPriorityDisplayName() {
        const priorityNames = {
            [MissionPriority.LOW]: '低',
            [MissionPriority.MEDIUM]: '中',
            [MissionPriority.HIGH]: '高',
            [MissionPriority.CRITICAL]: '紧急',
        };
        return priorityNames[this.priority];
    }
    canStart() {
        return this.status === MissionStatus.APPROVED && !this.isArchived;
    }
    canComplete() {
        return this.status === MissionStatus.IN_PROGRESS && !this.isArchived;
    }
    canCancel() {
        return [MissionStatus.DRAFT, MissionStatus.PLANNED, MissionStatus.APPROVED, MissionStatus.IN_PROGRESS]
            .includes(this.status) && !this.isArchived;
    }
    calculateProgress() {
        if (this.status === MissionStatus.COMPLETED)
            return 100;
        if (this.status === MissionStatus.CANCELLED || this.status === MissionStatus.FAILED)
            return 0;
        if (this.milestones && this.milestones.length > 0) {
            const completed = this.milestones.filter(m => m.completed).length;
            return Math.round((completed / this.milestones.length) * 100);
        }
        if (this.plannedStartDate && this.plannedEndDate) {
            const totalDuration = this.plannedEndDate.getTime() - this.plannedStartDate.getTime();
            const elapsed = Date.now() - this.plannedStartDate.getTime();
            return Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
        }
        return 0;
    }
    isDelayed() {
        if (this.status === MissionStatus.COMPLETED || this.status === MissionStatus.CANCELLED) {
            return false;
        }
        if (this.plannedEndDate && new Date() > this.plannedEndDate) {
            return true;
        }
        return false;
    }
    getDelayDays() {
        if (!this.isDelayed() || !this.plannedEndDate)
            return 0;
        const now = new Date();
        const endDate = new Date(this.plannedEndDate);
        const diffTime = Math.abs(now.getTime() - endDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
};
exports.Mission = Mission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Mission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Mission.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Mission.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Mission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MissionType,
        default: MissionType.COMBAT,
    }),
    __metadata("design:type", String)
], Mission.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MissionStatus,
        default: MissionStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Mission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MissionPriority,
        default: MissionPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], Mission.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "objectives", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "constraints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Mission.prototype, "plannedStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Mission.prototype, "plannedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Mission.prototype, "actualStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Mission.prototype, "actualEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Mission.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Mission.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Mission.prototype, "estimatedDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Mission.prototype, "actualDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Mission.prototype, "estimatedCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Mission.prototype, "actualCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Mission.prototype, "estimatedPersonnel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Mission.prototype, "actualPersonnel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Mission.prototype, "estimatedEquipment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Mission.prototype, "actualEquipment", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mission.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'unitId' }),
    __metadata("design:type", unit_entity_1.Unit)
], Mission.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], Mission.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mission.prototype, "assignedToId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedToId' }),
    __metadata("design:type", user_entity_1.User)
], Mission.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mission.prototype, "approvedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approvedById' }),
    __metadata("design:type", user_entity_1.User)
], Mission.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Mission.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Mission.prototype, "approvalNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Mission.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Mission.prototype, "isArchived", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "dependencies", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "risks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Mission.prototype, "milestones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Mission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Mission.prototype, "updatedAt", void 0);
exports.Mission = Mission = __decorate([
    (0, typeorm_1.Entity)('missions')
], Mission);
//# sourceMappingURL=mission.entity.js.map