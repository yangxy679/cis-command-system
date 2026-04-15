"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const units_controller_simple_1 = require("./units.controller.simple");
const units_service_1 = require("./units.service");
const unit_entity_1 = require("./entities/unit.entity");
const unit_personnel_entity_1 = require("./entities/unit-personnel.entity");
const unit_equipment_entity_1 = require("./entities/unit-equipment.entity");
const deployment_record_entity_1 = require("./entities/deployment-record.entity");
let UnitsModule = class UnitsModule {
};
exports.UnitsModule = UnitsModule;
exports.UnitsModule = UnitsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                unit_entity_1.Unit,
                unit_personnel_entity_1.UnitPersonnel,
                unit_equipment_entity_1.UnitEquipment,
                deployment_record_entity_1.DeploymentRecord,
            ]),
        ],
        controllers: [units_controller_simple_1.UnitsControllerSimple],
        providers: [units_service_1.UnitsService],
        exports: [units_service_1.UnitsService],
    })
], UnitsModule);
//# sourceMappingURL=units.module.js.map