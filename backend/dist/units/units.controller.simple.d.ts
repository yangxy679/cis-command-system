import { UnitsService } from './units.service';
export declare class UnitsControllerSimple {
    private readonly unitsService;
    constructor(unitsService: UnitsService);
    findAll(query: any): Promise<any>;
    getStatistics(): Promise<any>;
    findOne(id: string): Promise<import("./entities/unit.entity").Unit>;
    create(createUnitDto: any): Promise<import("./entities/unit.entity").Unit>;
    update(id: string, updateUnitDto: any): Promise<import("./entities/unit.entity").Unit>;
    remove(id: string): Promise<void>;
    getPersonnel(id: string, query: any): Promise<any>;
    getEquipment(id: string, query: any): Promise<any>;
    getDeployments(id: string, query: any): Promise<any>;
    deployUnit(id: string, deploymentData: any): Promise<import("./entities/deployment-record.entity").DeploymentRecord>;
}
