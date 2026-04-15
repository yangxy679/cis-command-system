import { Unit } from './unit.entity';
export declare enum DeploymentStatus {
    PLANNED = "planned",
    APPROVED = "approved",
    DEPLOYING = "deploying",
    DEPLOYED = "deployed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    DELAYED = "delayed"
}
export declare enum DeploymentPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare class DeploymentRecord {
    id: string;
    missionName: string;
    missionDescription: string;
    status: DeploymentStatus;
    priority: DeploymentPriority;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualEndDate: Date;
    deploymentLocation: string;
    coordinates: string;
    commander: string;
    commanderContact: string;
    personnelDeployed: Array<{
        id: string;
        name: string;
        role: string;
        status: string;
    }>;
    equipmentDeployed: Array<{
        id: string;
        name: string;
        type: string;
        status: string;
    }>;
    objectives: string[];
    constraints: string[];
    risks: Array<{
        description: string;
        probability: string;
        impact: string;
        mitigation: string;
    }>;
    progressUpdates: Array<{
        date: Date;
        status: string;
        description: string;
        reporter: string;
    }>;
    results: {
        objectivesAchieved: string[];
        casualties: number;
        equipmentLosses: number;
        successRate: number;
        lessonsLearned: string[];
    };
    unit: Unit;
    unitId: string;
    createdAt: Date;
    updatedAt: Date;
    getStatusDisplayName(): string;
    getPriorityDisplayName(): string;
    getDeploymentDuration(): number;
    isInProgress(): boolean;
    isCompleted(): boolean;
    getProgressPercentage(): number;
    getDeploymentSummary(): string;
}
