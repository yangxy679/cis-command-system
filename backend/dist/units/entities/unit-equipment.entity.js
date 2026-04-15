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
exports.UnitEquipment = exports.EquipmentStatus = exports.EquipmentType = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("./unit.entity");
var EquipmentType;
(function (EquipmentType) {
    EquipmentType["WEAPON"] = "weapon";
    EquipmentType["VEHICLE"] = "vehicle";
    EquipmentType["COMMUNICATION"] = "communication";
    EquipmentType["SURVEILLANCE"] = "surveillance";
    EquipmentType["MEDICAL"] = "medical";
    EquipmentType["ENGINEERING"] = "engineering";
    EquipmentType["LOGISTICS"] = "logistics";
    EquipmentType["PROTECTION"] = "protection";
    EquipmentType["AMMUNITION"] = "ammunition";
    EquipmentType["OTHER"] = "other";
})(EquipmentType || (exports.EquipmentType = EquipmentType = {}));
var EquipmentStatus;
(function (EquipmentStatus) {
    EquipmentStatus["OPERATIONAL"] = "operational";
    EquipmentStatus["MAINTENANCE"] = "maintenance";
    EquipmentStatus["REPAIR"] = "repair";
    EquipmentStatus["RESERVE"] = "reserve";
    EquipmentStatus["DECOMMISSIONED"] = "decommissioned";
    EquipmentStatus["LOST"] = "lost";
    EquipmentStatus["DAMAGED"] = "damaged";
})(EquipmentStatus || (exports.EquipmentStatus = EquipmentStatus = {}));
let UnitEquipment = class UnitEquipment {
    getTypeDisplayName() {
        const typeNames = {
            [EquipmentType.WEAPON]: '武器',
            [EquipmentType.VEHICLE]: '车辆',
            [EquipmentType.COMMUNICATION]: '通信设备',
            [EquipmentType.SURVEILLANCE]: '侦察设备',
            [EquipmentType.MEDICAL]: '医疗设备',
            [EquipmentType.ENGINEERING]: '工程设备',
            [EquipmentType.LOGISTICS]: '后勤装备',
            [EquipmentType.PROTECTION]: '防护装备',
            [EquipmentType.AMMUNITION]: '弹药',
            [EquipmentType.OTHER]: '其他',
        };
        return typeNames[this.type] || this.type;
    }
    getStatusDisplayName() {
        const statusNames = {
            [EquipmentStatus.OPERATIONAL]: '正常',
            [EquipmentStatus.MAINTENANCE]: '维护中',
            [EquipmentStatus.REPAIR]: '修理中',
            [EquipmentStatus.RESERVE]: '储备',
            [EquipmentStatus.DECOMMISSIONED]: '退役',
            [EquipmentStatus.LOST]: '丢失',
            [EquipmentStatus.DAMAGED]: '损坏',
        };
        return statusNames[this.status] || this.status;
    }
    getFullInfo() {
        return `${this.name}${this.model ? `（${this.model}）` : ''}`;
    }
    isAvailable() {
        return this.status === EquipmentStatus.OPERATIONAL && this.isActive;
    }
    needsMaintenance() {
        if (!this.nextMaintenanceDate)
            return false;
        const nextDate = new Date(this.nextMaintenanceDate);
        const now = new Date();
        return now >= nextDate;
    }
    getAgeYears() {
        if (!this.purchaseDate)
            return 0;
        const purchaseDate = new Date(this.purchaseDate);
        const now = new Date();
        const years = now.getFullYear() - purchaseDate.getFullYear();
        const months = now.getMonth() - purchaseDate.getMonth();
        return years + (months < 0 ? -1 : 0);
    }
};
exports.UnitEquipment = UnitEquipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UnitEquipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UnitEquipment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitEquipment.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitEquipment.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EquipmentType }),
    __metadata("design:type", String)
], UnitEquipment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EquipmentStatus, default: EquipmentStatus.OPERATIONAL }),
    __metadata("design:type", String)
], UnitEquipment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitEquipment.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UnitEquipment.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UnitEquipment.prototype, "lastMaintenanceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UnitEquipment.prototype, "nextMaintenanceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], UnitEquipment.prototype, "maintenanceInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitEquipment.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], UnitEquipment.prototype, "specifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], UnitEquipment.prototype, "maintenanceRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], UnitEquipment.prototype, "deploymentRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UnitEquipment.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, unit => unit.equipment),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.Unit)
], UnitEquipment.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UnitEquipment.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UnitEquipment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UnitEquipment.prototype, "updatedAt", void 0);
exports.UnitEquipment = UnitEquipment = __decorate([
    (0, typeorm_1.Entity)('unit_equipment')
], UnitEquipment);
//# sourceMappingURL=unit-equipment.entity.js.map