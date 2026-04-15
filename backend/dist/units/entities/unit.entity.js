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
exports.Unit = exports.UnitLevel = exports.UnitStatus = exports.UnitType = void 0;
const typeorm_1 = require("typeorm");
const unit_personnel_entity_1 = require("./unit-personnel.entity");
const unit_equipment_entity_1 = require("./unit-equipment.entity");
const deployment_record_entity_1 = require("./deployment-record.entity");
var UnitType;
(function (UnitType) {
    UnitType["INFANTRY"] = "infantry";
    UnitType["ARMOR"] = "armor";
    UnitType["ARTILLERY"] = "artillery";
    UnitType["ENGINEER"] = "engineer";
    UnitType["SIGNAL"] = "signal";
    UnitType["MEDICAL"] = "medical";
    UnitType["LOGISTICS"] = "logistics";
    UnitType["SPECIAL_FORCES"] = "special_forces";
    UnitType["AVIATION"] = "aviation";
    UnitType["NAVY"] = "navy";
})(UnitType || (exports.UnitType = UnitType = {}));
var UnitStatus;
(function (UnitStatus) {
    UnitStatus["STANDBY"] = "standby";
    UnitStatus["DEPLOYED"] = "deployed";
    UnitStatus["TRAINING"] = "training";
    UnitStatus["MAINTENANCE"] = "maintenance";
    UnitStatus["COMBAT"] = "combat";
    UnitStatus["DISABLED"] = "disabled";
})(UnitStatus || (exports.UnitStatus = UnitStatus = {}));
var UnitLevel;
(function (UnitLevel) {
    UnitLevel["SQUAD"] = "squad";
    UnitLevel["PLATOON"] = "platoon";
    UnitLevel["COMPANY"] = "company";
    UnitLevel["BATTALION"] = "battalion";
    UnitLevel["REGIMENT"] = "regiment";
    UnitLevel["BRIGADE"] = "brigade";
    UnitLevel["DIVISION"] = "division";
    UnitLevel["CORPS"] = "corps";
})(UnitLevel || (exports.UnitLevel = UnitLevel = {}));
let Unit = class Unit {
    getTypeDisplayName() {
        const typeNames = {
            [UnitType.INFANTRY]: '步兵',
            [UnitType.ARMOR]: '装甲',
            [UnitType.ARTILLERY]: '炮兵',
            [UnitType.ENGINEER]: '工兵',
            [UnitType.SIGNAL]: '通信',
            [UnitType.MEDICAL]: '医疗',
            [UnitType.LOGISTICS]: '后勤',
            [UnitType.SPECIAL_FORCES]: '特种部队',
            [UnitType.AVIATION]: '航空兵',
            [UnitType.NAVY]: '海军',
        };
        return typeNames[this.type] || this.type;
    }
    getStatusDisplayName() {
        const statusNames = {
            [UnitStatus.STANDBY]: '待命',
            [UnitStatus.DEPLOYED]: '已部署',
            [UnitStatus.TRAINING]: '训练中',
            [UnitStatus.MAINTENANCE]: '维护中',
            [UnitStatus.COMBAT]: '作战中',
            [UnitStatus.DISABLED]: '禁用',
        };
        return statusNames[this.status] || this.status;
    }
    getLevelDisplayName() {
        const levelNames = {
            [UnitLevel.SQUAD]: '班',
            [UnitLevel.PLATOON]: '排',
            [UnitLevel.COMPANY]: '连',
            [UnitLevel.BATTALION]: '营',
            [UnitLevel.REGIMENT]: '团',
            [UnitLevel.BRIGADE]: '旅',
            [UnitLevel.DIVISION]: '师',
            [UnitLevel.CORPS]: '军',
        };
        return levelNames[this.level] || this.level;
    }
    canDeploy() {
        return this.status === UnitStatus.STANDBY && this.isActive;
    }
    getFullName() {
        return `${this.getLevelDisplayName()}${this.name}（${this.code}）`;
    }
};
exports.Unit = Unit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Unit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Unit.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UnitType }),
    __metadata("design:type", String)
], Unit.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UnitLevel }),
    __metadata("design:type", String)
], Unit.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UnitStatus, default: UnitStatus.STANDBY }),
    __metadata("design:type", String)
], Unit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Unit.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Unit.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Unit.prototype, "commander", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Unit.prototype, "commanderRank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Unit.prototype, "commanderContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Unit.prototype, "personnelCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Unit.prototype, "equipmentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Unit.prototype, "capabilities", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Unit.prototype, "deploymentHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Unit.prototype, "statistics", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Unit.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => unit_personnel_entity_1.UnitPersonnel, personnel => personnel.unit),
    __metadata("design:type", Array)
], Unit.prototype, "personnel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => unit_equipment_entity_1.UnitEquipment, equipment => equipment.unit),
    __metadata("design:type", Array)
], Unit.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deployment_record_entity_1.DeploymentRecord, deployment => deployment.unit),
    __metadata("design:type", Array)
], Unit.prototype, "deployments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Unit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Unit.prototype, "updatedAt", void 0);
exports.Unit = Unit = __decorate([
    (0, typeorm_1.Entity)('units')
], Unit);
//# sourceMappingURL=unit.entity.js.map