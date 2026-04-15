import { Unit } from './unit.entity';
export declare enum PersonnelRole {
    COMMANDER = "commander",
    DEPUTY_COMMANDER = "deputy_commander",
    OPERATOR = "operator",
    TECHNICIAN = "technician",
    MEDIC = "medic",
    LOGISTICS = "logistics",
    INTELLIGENCE = "intelligence",
    COMMUNICATION = "communication",
    DRIVER = "driver",
    GUNNER = "gunner",
    INFANTRY = "infantry"
}
export declare enum PersonnelStatus {
    ACTIVE = "active",
    ON_LEAVE = "on_leave",
    TRAINING = "training",
    MEDICAL = "medical",
    TRANSFERRED = "transferred",
    RETIRED = "retired"
}
export declare class UnitPersonnel {
    id: string;
    name: string;
    militaryId: string;
    role: PersonnelRole;
    rank: string;
    status: PersonnelStatus;
    specialty: string;
    qualifications: string;
    joinDate: Date;
    birthDate: Date;
    contact: string;
    emergencyContact: string;
    trainingRecords: Array<{
        date: Date;
        course: string;
        result: string;
        certificate: string;
    }>;
    deploymentRecords: Array<{
        date: Date;
        mission: string;
        location: string;
        role: string;
        performance: string;
    }>;
    isActive: boolean;
    unit: Unit;
    unitId: string;
    createdAt: Date;
    updatedAt: Date;
    getRoleDisplayName(): string;
    getStatusDisplayName(): string;
    getFullInfo(): string;
    isOnDuty(): boolean;
    getServiceYears(): number;
}
