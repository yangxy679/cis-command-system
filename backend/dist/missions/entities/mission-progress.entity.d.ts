import { Mission } from './mission.entity';
import { User } from '../../auth/entities/user.entity';
export declare enum ProgressType {
    STATUS_CHANGE = "status_change",
    MILESTONE_COMPLETE = "milestone_complete",
    COMMENT = "comment",
    ATTACHMENT = "attachment",
    RISK_UPDATE = "risk_update",
    COST_UPDATE = "cost_update",
    SCHEDULE_UPDATE = "schedule_update",
    OTHER = "other"
}
export declare class MissionProgress {
    id: string;
    missionId: string;
    mission: Mission;
    type: ProgressType;
    content: string;
    metadata: any;
    createdById: string;
    createdBy: User;
    createdAt: Date;
    getTypeDisplayName(): string;
    getDisplayContent(): string;
}
