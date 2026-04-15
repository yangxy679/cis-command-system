import { UnitPersonnel } from './unit-personnel.entity';
import { UnitEquipment } from './unit-equipment.entity';
import { DeploymentRecord } from './deployment-record.entity';
export declare enum UnitType {
    INFANTRY = "infantry",
    ARMOR = "armor",
    ARTILLERY = "artillery",
    ENGINEER = "engineer",
    SIGNAL = "signal",
    MEDICAL = "medical",
    LOGISTICS = "logistics",
    SPECIAL_FORCES = "special_forces",
    AVIATION = "aviation",
    NAVY = "navy"
}
export declare enum UnitStatus {
    STANDBY = "standby",
    DEPLOYED = "deployed",
    TRAINING = "training",
    MAINTENANCE = "maintenance",
    COMBAT = "combat",
    DISABLED = "disabled"
}
export declare enum UnitLevel {
    SQUAD = "squad",
    PLATOON = "platoon",
    COMPANY = "company",
    BATTALION = "battalion",
    REGIMENT = "regiment",
    BRIGADE = "brigade",
    DIVISION = "division",
    CORPS = "corps"
}
export declare class Unit {
    id: string;
    name: string;
    code: string;
    type: UnitType;
    level: UnitLevel;
    status: UnitStatus;
    description: string;
    location: string;
    commander: string;
    commanderRank: string;
    commanderContact: string;
    personnelCount: number;
    equipmentCount: number;
    capabilities: string[];
    deploymentHistory: Array<{
        date: Date;
        location: string;
        mission: string;
        status: string;
    }>;
    statistics: {
        missionsCompleted: number;
        missionsActive: number;
        successRate: number;
        averageResponseTime: number;
        lastDeploymentDate: Date;
    };
    isActive: boolean;
    personnel: UnitPersonnel[];
    equipment: UnitEquipment[];
    deployments: DeploymentRecord[];
    createdAt: Date;
    updatedAt: Date;
    getTypeDisplayName(): string;
    getStatusDisplayName(): string;
    getLevelDisplayName(): string;
    canDeploy(): boolean;
    getFullName(): string;
}
