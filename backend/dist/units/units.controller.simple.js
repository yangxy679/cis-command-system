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
exports.UnitsControllerSimple = void 0;
const common_1 = require("@nestjs/common");
const units_service_1 = require("./units.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UnitsControllerSimple = class UnitsControllerSimple {
    constructor(unitsService) {
        this.unitsService = unitsService;
    }
    async findAll(query) {
        return this.unitsService.findAllUnits(query);
    }
    async getStatistics() {
        return this.unitsService.getUnitStatistics();
    }
    async findOne(id) {
        return this.unitsService.findUnitById(id);
    }
    async create(createUnitDto) {
        return this.unitsService.createUnit(createUnitDto);
    }
    async update(id, updateUnitDto) {
        return this.unitsService.updateUnit(id, updateUnitDto);
    }
    async remove(id) {
        return this.unitsService.deleteUnit(id);
    }
    async getPersonnel(id, query) {
        return this.unitsService.getUnitPersonnel(id, query);
    }
    async getEquipment(id, query) {
        return this.unitsService.getUnitEquipment(id, query);
    }
    async getDeployments(id, query) {
        return this.unitsService.getUnitDeployments(id, query);
    }
    async deployUnit(id, deploymentData) {
        return this.unitsService.deployUnit(id, deploymentData);
    }
};
exports.UnitsControllerSimple = UnitsControllerSimple;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/personnel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "getPersonnel", null);
__decorate([
    (0, common_1.Get)(':id/equipment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "getEquipment", null);
__decorate([
    (0, common_1.Get)(':id/deployments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "getDeployments", null);
__decorate([
    (0, common_1.Post)(':id/deploy'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UnitsControllerSimple.prototype, "deployUnit", null);
exports.UnitsControllerSimple = UnitsControllerSimple = __decorate([
    (0, common_1.Controller)('units'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [units_service_1.UnitsService])
], UnitsControllerSimple);
//# sourceMappingURL=units.controller.simple.js.map