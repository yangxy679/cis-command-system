import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { UnitPersonnel } from './entities/unit-personnel.entity';
import { UnitEquipment } from './entities/unit-equipment.entity';
import { DeploymentRecord } from './entities/deployment-record.entity';
export declare class UnitsService {
    private unitsRepository;
    private personnelRepository;
    private equipmentRepository;
    private deploymentRepository;
    constructor(unitsRepository: Repository<Unit>, personnelRepository: Repository<UnitPersonnel>, equipmentRepository: Repository<UnitEquipment>, deploymentRepository: Repository<DeploymentRecord>);
    findAllUnits(query: any): Promise<any>;
    getUnitStatistics(): Promise<any>;
    findUnitById(id: string): Promise<Unit>;
    createUnit(createUnitDto: any): Promise<Unit>;
    updateUnit(id: string, updateUnitDto: any): Promise<Unit>;
    deleteUnit(id: string): Promise<void>;
    getUnitPersonnel(unitId: string, query: any): Promise<any>;
    getUnitEquipment(unitId: string, query: any): Promise<any>;
    getUnitDeployments(unitId: string, query: any): Promise<any>;
    deployUnit(unitId: string, deploymentData: any): Promise<DeploymentRecord>;
}
