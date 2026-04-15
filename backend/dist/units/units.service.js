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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unit_entity_1 = require("./entities/unit.entity");
const unit_personnel_entity_1 = require("./entities/unit-personnel.entity");
const unit_equipment_entity_1 = require("./entities/unit-equipment.entity");
const deployment_record_entity_1 = require("./entities/deployment-record.entity");
let UnitsService = class UnitsService {
    constructor(unitsRepository, personnelRepository, equipmentRepository, deploymentRepository) {
        this.unitsRepository = unitsRepository;
        this.personnelRepository = personnelRepository;
        this.equipmentRepository = equipmentRepository;
        this.deploymentRepository = deploymentRepository;
    }
    async findAllUnits(query) {
        const { page = 1, limit = 20, search, type, status, level, isActive } = query;
        const queryBuilder = this.unitsRepository.createQueryBuilder('unit');
        if (search) {
            queryBuilder.where('unit.name LIKE :search OR unit.code LIKE :search OR unit.commander LIKE :search', {
                search: `%${search}%`,
            });
        }
        if (type) {
            queryBuilder.andWhere('unit.type = :type', { type });
        }
        if (status) {
            queryBuilder.andWhere('unit.status = :status', { status });
        }
        if (level) {
            queryBuilder.andWhere('unit.level = :level', { level });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('unit.isActive = :isActive', { isActive: isActive === 'true' });
        }
        const skip = (page - 1) * limit;
        const [data, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getUnitStatistics() {
        const total = await this.unitsRepository.count();
        const active = await this.unitsRepository.count({ where: { isActive: true } });
        const inactive = total - active;
        const typeStats = await this.unitsRepository
            .createQueryBuilder('unit')
            .select('unit.type, COUNT(*) as count')
            .groupBy('unit.type')
            .getRawMany();
        const statusStats = await this.unitsRepository
            .createQueryBuilder('unit')
            .select('unit.status, COUNT(*) as count')
            .groupBy('unit.status')
            .getRawMany();
        const levelStats = await this.unitsRepository
            .createQueryBuilder('unit')
            .select('unit.level, COUNT(*) as count')
            .groupBy('unit.level')
            .getRawMany();
        const totalPersonnel = await this.personnelRepository.count();
        const totalEquipment = await this.equipmentRepository.count();
        return {
            total,
            active,
            inactive,
            typeStats,
            statusStats,
            levelStats,
            totalPersonnel,
            totalEquipment,
        };
    }
    async findUnitById(id) {
        const unit = await this.unitsRepository.findOne({
            where: { id },
            relations: ['personnel', 'equipment', 'deployments'],
        });
        if (!unit) {
            throw new Error('单位不存在');
        }
        return unit;
    }
    async createUnit(createUnitDto) {
        const existingUnit = await this.unitsRepository.findOne({
            where: { code: createUnitDto.code },
        });
        if (existingUnit) {
            throw new Error('单位代码已存在');
        }
        const unit = this.unitsRepository.create({
            ...createUnitDto,
            status: 'standby',
            personnelCount: 0,
            equipmentCount: 0,
            isActive: true,
        });
        return await this.unitsRepository.save(unit);
    }
    async updateUnit(id, updateUnitDto) {
        const unit = await this.findUnitById(id);
        if (updateUnitDto.code && updateUnitDto.code !== unit.code) {
            const existingUnit = await this.unitsRepository.findOne({
                where: { code: updateUnitDto.code },
            });
            if (existingUnit) {
                throw new Error('单位代码已存在');
            }
        }
        Object.assign(unit, updateUnitDto);
        unit.updatedAt = new Date();
        return await this.unitsRepository.save(unit);
    }
    async deleteUnit(id) {
        const unit = await this.findUnitById(id);
        const activeDeployments = await this.deploymentRepository.find({
            where: {
                unitId: id,
                status: 'deployed',
            },
        });
        if (activeDeployments.length > 0) {
            throw new Error('单位有进行中的部署任务，无法删除');
        }
        await this.unitsRepository.remove(unit);
    }
    async getUnitPersonnel(unitId, query) {
        const { page = 1, limit = 20, role, status } = query;
        const queryBuilder = this.personnelRepository
            .createQueryBuilder('personnel')
            .where('personnel.unitId = :unitId', { unitId });
        if (role) {
            queryBuilder.andWhere('personnel.role = :role', { role });
        }
        if (status) {
            queryBuilder.andWhere('personnel.status = :status', { status });
        }
        const skip = (page - 1) * limit;
        const [data, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getUnitEquipment(unitId, query) {
        const { page = 1, limit = 20, type, status } = query;
        const queryBuilder = this.equipmentRepository
            .createQueryBuilder('equipment')
            .where('equipment.unitId = :unitId', { unitId });
        if (type) {
            queryBuilder.andWhere('equipment.type = :type', { type });
        }
        if (status) {
            queryBuilder.andWhere('equipment.status = :status', { status });
        }
        const skip = (page - 1) * limit;
        const [data, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getUnitDeployments(unitId, query) {
        const { page = 1, limit = 20, status, priority, startDate, endDate } = query;
        const queryBuilder = this.deploymentRepository
            .createQueryBuilder('deployment')
            .where('deployment.unitId = :unitId', { unitId });
        if (status) {
            queryBuilder.andWhere('deployment.status = :status', { status });
        }
        if (priority) {
            queryBuilder.andWhere('deployment.priority = :priority', { priority });
        }
        if (startDate) {
            queryBuilder.andWhere('deployment.plannedStartDate >= :startDate', { startDate });
        }
        if (endDate) {
            queryBuilder.andWhere('deployment.plannedEndDate <= :endDate', { endDate });
        }
        const skip = (page - 1) * limit;
        const [data, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async deployUnit(unitId, deploymentData) {
        const unit = await this.findUnitById(unitId);
        if (unit.status !== 'standby') {
            throw new Error('单位当前状态不可部署');
        }
        if (!unit.isActive) {
            throw new Error('单位已被禁用');
        }
        const deployment = this.deploymentRepository.create({
            ...deploymentData,
            unitId,
            status: 'deployed',
        });
        unit.status = 'deployed';
        unit.updatedAt = new Date();
        await this.unitsRepository.save(unit);
        return await this.deploymentRepository.save(deployment);
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(1, (0, typeorm_1.InjectRepository)(unit_personnel_entity_1.UnitPersonnel)),
    __param(2, (0, typeorm_1.InjectRepository)(unit_equipment_entity_1.UnitEquipment)),
    __param(3, (0, typeorm_1.InjectRepository)(deployment_record_entity_1.DeploymentRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UnitsService);
//# sourceMappingURL=units.service.js.map