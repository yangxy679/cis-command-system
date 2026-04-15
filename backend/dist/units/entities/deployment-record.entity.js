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
exports.DeploymentRecord = exports.DeploymentPriority = exports.DeploymentStatus = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("./unit.entity");
var DeploymentStatus;
(function (DeploymentStatus) {
    DeploymentStatus["PLANNED"] = "planned";
    DeploymentStatus["APPROVED"] = "approved";
    DeploymentStatus["DEPLOYING"] = "deploying";
    DeploymentStatus["DEPLOYED"] = "deployed";
    DeploymentStatus["COMPLETED"] = "completed";
    DeploymentStatus["CANCELLED"] = "cancelled";
    DeploymentStatus["DELAYED"] = "delayed";
})(DeploymentStatus || (exports.DeploymentStatus = DeploymentStatus = {}));
var DeploymentPriority;
(function (DeploymentPriority) {
    DeploymentPriority["LOW"] = "low";
    DeploymentPriority["MEDIUM"] = "medium";
    DeploymentPriority["HIGH"] = "high";
    DeploymentPriority["CRITICAL"] = "critical";
})(DeploymentPriority || (exports.DeploymentPriority = DeploymentPriority = {}));
let DeploymentRecord = class DeploymentRecord {
    getStatusDisplayName() {
        const statusNames = {
            [DeploymentStatus.PLANNED]: '计划中',
            [DeploymentStatus.APPROVED]: '已批准',
            [DeploymentStatus.DEPLOYING]: '部署中',
            [DeploymentStatus.DEPLOYED]: '已部署',
            [DeploymentStatus.COMPLETED]: '已完成',
            [DeploymentStatus.CANCELLED]: '已取消',
            [DeploymentStatus.DELAYED]: '延迟',
        };
        return statusNames[this.status] || this.status;
    }
    getPriorityDisplayName() {
        const priorityNames = {
            [DeploymentPriority.LOW]: '低',
            [DeploymentPriority.MEDIUM]: '中',
            [DeploymentPriority.HIGH]: '高',
            [DeploymentPriority.CRITICAL]: '紧急',
        };
        return priorityNames[this.priority] || this.priority;
    }
    getDeploymentDuration() {
        const start = this.actualStartDate ? new Date(this.actualStartDate) : new Date(this.plannedStartDate);
        const end = this.actualEndDate ? new Date(this.actualEndDate) : new Date(this.plannedEndDate);
        const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return duration > 0 ? duration : 0;
    }
    isInProgress() {
        return [
            DeploymentStatus.DEPLOYING,
            DeploymentStatus.DEPLOYED
        ].includes(this.status);
    }
    isCompleted() {
        return this.status === DeploymentStatus.COMPLETED;
    }
    getProgressPercentage() {
        if (this.isCompleted())
            return 100;
        if (!this.isInProgress())
            return 0;
        const start = new Date(this.plannedStartDate);
        const end = new Date(this.plannedEndDate);
        const now = new Date();
        if (now < start)
            return 0;
        if (now > end)
            return 100;
        const totalDuration = end.getTime() - start.getTime();
        const elapsed = now.getTime() - start.getTime();
        return Math.min(100, Math.round((elapsed / totalDuration) * 100));
    }
    getDeploymentSummary() {
        return `${this.missionName} - ${this.getStatusDisplayName()} - ${this.deploymentLocation}`;
    }
};
exports.DeploymentRecord = DeploymentRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "missionName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "missionDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DeploymentStatus, default: DeploymentStatus.PLANNED }),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DeploymentPriority, default: DeploymentPriority.MEDIUM }),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DeploymentRecord.prototype, "plannedStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DeploymentRecord.prototype, "plannedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], DeploymentRecord.prototype, "actualStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], DeploymentRecord.prototype, "actualEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "deploymentLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "commander", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "commanderContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DeploymentRecord.prototype, "personnelDeployed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DeploymentRecord.prototype, "equipmentDeployed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DeploymentRecord.prototype, "objectives", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DeploymentRecord.prototype, "constraints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DeploymentRecord.prototype, "risks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DeploymentRecord.prototype, "progressUpdates", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], DeploymentRecord.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, unit => unit.deployments),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.Unit)
], DeploymentRecord.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeploymentRecord.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DeploymentRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DeploymentRecord.prototype, "updatedAt", void 0);
exports.DeploymentRecord = DeploymentRecord = __decorate([
    (0, typeorm_1.Entity)('deployment_records')
], DeploymentRecord);
//# sourceMappingURL=deployment-record.entity.js.map