export declare enum StatisticsType {
    SYSTEM_USAGE = "system_usage",
    USER_ACTIVITY = "user_activity",
    MISSION_PERFORMANCE = "mission_performance",
    UNIT_READINESS = "unit_readiness",
    COST_ANALYSIS = "cost_analysis",
    RISK_ASSESSMENT = "risk_assessment"
}
export declare class Statistics {
    id: string;
    type: StatisticsType;
    data: any;
    periodStart: Date;
    periodEnd: Date;
    createdAt: Date;
    getTypeDisplayName(): string;
    getPeriodDisplay(): string;
    getSummary(): string;
}
