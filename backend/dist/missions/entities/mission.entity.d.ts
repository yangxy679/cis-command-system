import { Unit } from '../../units/entities/unit.entity';
import { User } from '../../auth/entities/user.entity';
export declare enum MissionStatus {
    DRAFT = "draft",
    PLANNED = "planned",
    APPROVED = "approved",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    DELAYED = "delayed",
    FAILED = "failed"
}
export declare enum MissionPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum MissionType {
    COMBAT = "combat",
    TRAINING = "training",
    PATROL = "patrol",
    SECURITY = "security",
    RESCUE = "rescue",
    LOGISTICS = "logistics",
    INTELLIGENCE = "intelligence",
    OTHER = "other"
}
export declare class Mission {
    id: string;
    name: string;
    code: string;
    description: string;
    type: MissionType;
    status: MissionStatus;
    priority: MissionPriority;
    objectives: string[];
    constraints: string[];
    requirements: string[];
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualEndDate: Date;
    location: string;
    coordinates: string;
    estimatedDuration: number;
    actualDuration: number;
    estimatedCost: number;
    actualCost: number;
    estimatedPersonnel: number;
    actualPersonnel: number;
    estimatedEquipment: number;
    actualEquipment: number;
    unitId: string;
    unit: Unit;
    createdById: string;
    createdBy: User;
    assignedToId: string;
    assignedTo: User;
    approvedById: string;
    approvedBy: User;
    approvedAt: Date;
    approvalNotes: string;
    isActive: boolean;
    isArchived: boolean;
    attachments: Array<{
        name: string;
        url: string;
        type: string;
        size: number;
    }>;
    tags: string[];
    dependencies: string[];
    risks: Array<{
        description: string;
        probability: 'low' | 'medium' | 'high';
        impact: 'low' | 'medium' | 'high';
        mitigation: string;
    }>;
    milestones: Array<{
        name: string;
        description: string;
        dueDate: Date;
        completed: boolean;
        completedAt: Date | null;
    }>;
    createdAt: Date;
    updatedAt: Date;
    getStatusDisplayName(): string;
    getTypeDisplayName(): string;
    getPriorityDisplayName(): string;
    canStart(): boolean;
    canComplete(): boolean;
    canCancel(): boolean;
    calculateProgress(): number;
    isDelayed(): boolean;
    getDelayDays(): number;
}
