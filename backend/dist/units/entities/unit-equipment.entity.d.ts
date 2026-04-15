import { Unit } from './unit.entity';
export declare enum EquipmentType {
    WEAPON = "weapon",
    VEHICLE = "vehicle",
    COMMUNICATION = "communication",
    SURVEILLANCE = "surveillance",
    MEDICAL = "medical",
    ENGINEERING = "engineering",
    LOGISTICS = "logistics",
    PROTECTION = "protection",
    AMMUNITION = "ammunition",
    OTHER = "other"
}
export declare enum EquipmentStatus {
    OPERATIONAL = "operational",
    MAINTENANCE = "maintenance",
    REPAIR = "repair",
    RESERVE = "reserve",
    DECOMMISSIONED = "decommissioned",
    LOST = "lost",
    DAMAGED = "damaged"
}
export declare class UnitEquipment {
    id: string;
    name: string;
    model: string;
    serialNumber: string;
    type: EquipmentType;
    status: EquipmentStatus;
    manufacturer: string;
    purchaseDate: Date;
    lastMaintenanceDate: Date;
    nextMaintenanceDate: Date;
    maintenanceInterval: number;
    operator: string;
    specifications: Record<string, any>;
    maintenanceRecords: Array<{
        date: Date;
        type: string;
        description: string;
        technician: string;
        cost: number;
    }>;
    deploymentRecords: Array<{
        date: Date;
        mission: string;
        location: string;
        operator: string;
        performance: string;
    }>;
    isActive: boolean;
    unit: Unit;
    unitId: string;
    createdAt: Date;
    updatedAt: Date;
    getTypeDisplayName(): string;
    getStatusDisplayName(): string;
    getFullInfo(): string;
    isAvailable(): boolean;
    needsMaintenance(): boolean;
    getAgeYears(): number;
}
