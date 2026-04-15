import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { UnitPersonnel } from './entities/unit-personnel.entity';
import { UnitEquipment } from './entities/unit-equipment.entity';
import { DeploymentRecord } from './entities/deployment-record.entity';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private unitsRepository: Repository<Unit>,
    @InjectRepository(UnitPersonnel)
    private personnelRepository: Repository<UnitPersonnel>,
    @InjectRepository(UnitEquipment)
    private equipmentRepository: Repository<UnitEquipment>,
    @InjectRepository(DeploymentRecord)
    private deploymentRepository: Repository<DeploymentRecord>,
  ) {}

  // 获取所有单位
  async findAllUnits(query: any): Promise<any> {
    const { page = 1, limit = 20, search, type, status, level, isActive } = query;
    
    const queryBuilder = this.unitsRepository.createQueryBuilder('unit');
    
    // 搜索条件
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
    
    // 分页
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

  // 获取单位统计信息
  async getUnitStatistics(): Promise<any> {
    const total = await this.unitsRepository.count();
    const active = await this.unitsRepository.count({ where: { isActive: true } });
    const inactive = total - active;
    
    // 类型统计
    const typeStats = await this.unitsRepository
      .createQueryBuilder('unit')
      .select('unit.type, COUNT(*) as count')
      .groupBy('unit.type')
      .getRawMany();
    
    // 状态统计
    const statusStats = await this.unitsRepository
      .createQueryBuilder('unit')
      .select('unit.status, COUNT(*) as count')
      .groupBy('unit.status')
      .getRawMany();
    
    // 级别统计
    const levelStats = await this.unitsRepository
      .createQueryBuilder('unit')
      .select('unit.level, COUNT(*) as count')
      .groupBy('unit.level')
      .getRawMany();
    
    // 总人员数
    const totalPersonnel = await this.personnelRepository.count();
    
    // 总装备数
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

  // 根据ID查找单位
  async findUnitById(id: string): Promise<Unit> {
    const unit = await this.unitsRepository.findOne({
      where: { id },
      relations: ['personnel', 'equipment', 'deployments'],
    });
    
    if (!unit) {
      throw new Error('单位不存在');
    }
    
    return unit;
  }

  // 创建单位
  async createUnit(createUnitDto: any): Promise<Unit> {
    // 检查单位代码是否已存在
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

  // 更新单位
  async updateUnit(id: string, updateUnitDto: any): Promise<Unit> {
    const unit = await this.findUnitById(id);
    
    // 如果更新了单位代码，检查是否重复
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

  // 删除单位
  async deleteUnit(id: string): Promise<void> {
    const unit = await this.findUnitById(id);
    
    // 检查是否有进行中的部署任务
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

  // 获取单位人员
  async getUnitPersonnel(unitId: string, query: any): Promise<any> {
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

  // 获取单位装备
  async getUnitEquipment(unitId: string, query: any): Promise<any> {
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

  // 获取单位部署记录
  async getUnitDeployments(unitId: string, query: any): Promise<any> {
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

  // 部署单位
  async deployUnit(unitId: string, deploymentData: any): Promise<DeploymentRecord> {
    const unit = await this.findUnitById(unitId);
    
    // 检查单位是否可部署
    if (unit.status !== 'standby') {
      throw new Error('单位当前状态不可部署');
    }
    
    if (!unit.isActive) {
      throw new Error('单位已被禁用');
    }
    
    // 创建部署记录
    const deployment = this.deploymentRepository.create({
      ...deploymentData,
      unitId,
      status: 'deployed',
    });
    
    // 更新单位状态
    unit.status = 'deployed';
    unit.updatedAt = new Date();
    
    await this.unitsRepository.save(unit);
    
    return await this.deploymentRepository.save(deployment);
  }
}
