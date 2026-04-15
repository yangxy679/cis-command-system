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
exports.UnitPersonnel = exports.PersonnelStatus = exports.PersonnelRole = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("./unit.entity");
var PersonnelRole;
(function (PersonnelRole) {
    PersonnelRole["COMMANDER"] = "commander";
    PersonnelRole["DEPUTY_COMMANDER"] = "deputy_commander";
    PersonnelRole["OPERATOR"] = "operator";
    PersonnelRole["TECHNICIAN"] = "technician";
    PersonnelRole["MEDIC"] = "medic";
    PersonnelRole["LOGISTICS"] = "logistics";
    PersonnelRole["INTELLIGENCE"] = "intelligence";
    PersonnelRole["COMMUNICATION"] = "communication";
    PersonnelRole["DRIVER"] = "driver";
    PersonnelRole["GUNNER"] = "gunner";
    PersonnelRole["INFANTRY"] = "infantry";
})(PersonnelRole || (exports.PersonnelRole = PersonnelRole = {}));
var PersonnelStatus;
(function (PersonnelStatus) {
    PersonnelStatus["ACTIVE"] = "active";
    PersonnelStatus["ON_LEAVE"] = "on_leave";
    PersonnelStatus["TRAINING"] = "training";
    PersonnelStatus["MEDICAL"] = "medical";
    PersonnelStatus["TRANSFERRED"] = "transferred";
    PersonnelStatus["RETIRED"] = "retired";
})(PersonnelStatus || (exports.PersonnelStatus = PersonnelStatus = {}));
let UnitPersonnel = class UnitPersonnel {
    getRoleDisplayName() {
        const roleNames = {
            [PersonnelRole.COMMANDER]: '指挥员',
            [PersonnelRole.DEPUTY_COMMANDER]: '副指挥员',
            [PersonnelRole.OPERATOR]: '操作员',
            [PersonnelRole.TECHNICIAN]: '技术员',
            [PersonnelRole.MEDIC]: '医疗兵',
            [PersonnelRole.LOGISTICS]: '后勤人员',
            [PersonnelRole.INTELLIGENCE]: '情报员',
            [PersonnelRole.COMMUNICATION]: '通信员',
            [PersonnelRole.DRIVER]: '驾驶员',
            [PersonnelRole.GUNNER]: '炮手',
            [PersonnelRole.INFANTRY]: '步兵',
        };
        return roleNames[this.role] || this.role;
    }
    getStatusDisplayName() {
        const statusNames = {
            [PersonnelStatus.ACTIVE]: '在岗',
            [PersonnelStatus.ON_LEAVE]: '休假',
            [PersonnelStatus.TRAINING]: '培训',
            [PersonnelStatus.MEDICAL]: '医疗',
            [PersonnelStatus.TRANSFERRED]: '调离',
            [PersonnelStatus.RETIRED]: '退役',
        };
        return statusNames[this.status] || this.status;
    }
    getFullInfo() {
        return `${this.rank || ''}${this.name}（${this.getRoleDisplayName()}）`;
    }
    isOnDuty() {
        return this.status === PersonnelStatus.ACTIVE && this.isActive;
    }
    getServiceYears() {
        if (!this.joinDate)
            return 0;
        const joinDate = new Date(this.joinDate);
        const now = new Date();
        const years = now.getFullYear() - joinDate.getFullYear();
        const months = now.getMonth() - joinDate.getMonth();
        return years + (months < 0 ? -1 : 0);
    }
};
exports.UnitPersonnel = UnitPersonnel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "militaryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PersonnelRole }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PersonnelStatus, default: PersonnelStatus.ACTIVE }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "specialty", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "qualifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UnitPersonnel.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UnitPersonnel.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "emergencyContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], UnitPersonnel.prototype, "trainingRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], UnitPersonnel.prototype, "deploymentRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UnitPersonnel.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, unit => unit.personnel),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.Unit)
], UnitPersonnel.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UnitPersonnel.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UnitPersonnel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UnitPersonnel.prototype, "updatedAt", void 0);
exports.UnitPersonnel = UnitPersonnel = __decorate([
    (0, typeorm_1.Entity)('unit_personnel')
], UnitPersonnel);
//# sourceMappingURL=unit-personnel.entity.js.map