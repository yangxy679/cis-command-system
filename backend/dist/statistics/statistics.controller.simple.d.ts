import { StatisticsServiceSimple } from './statistics.service.simple';
export declare class StatisticsControllerSimple {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsServiceSimple);
    getSystemUsageStatistics(): Promise<any>;
    getUserActivityStatistics(): Promise<any>;
    getMissionPerformanceStatistics(): Promise<any>;
    getUnitReadinessStatistics(): Promise<any>;
    getCostAnalysisStatistics(): Promise<any>;
    getRiskAssessmentStatistics(): Promise<any>;
    getComprehensiveReport(): Promise<any>;
    getDashboardStatistics(): Promise<{
        systemHealth: {
            activeUsers: any;
            activeMissions: any;
            deployedUnits: any;
            systemUptime: number;
        };
        missionMetrics: {
            successRate: any;
            delayedMissions: any;
            avgCost: any;
            completionRate: string;
        };
        unitMetrics: {
            totalUnits: any;
            readinessRate: string;
            avgDeploymentTime: any;
            maintenanceUnits: any;
        };
        costMetrics: {
            totalCost: any;
            costEfficiency: any;
            costOverrun: any;
            avgCostPerMission: any;
        };
        recentActivity: {
            newUsers: any;
            newMissions: any;
            recentDeployments: any;
            completedMissions: any;
        };
    }>;
}
