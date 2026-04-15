export declare class DashboardStatsDto {
    onlineUsers: number;
    combatUnits: number;
    activeMissions: number;
    systemHealth: number;
    cpuUsage: number;
    memoryUsage: number;
    networkTraffic: number;
    storageUsage: number;
    recentActivities: Array<{
        id: string;
        type: string;
        description: string;
        timestamp: Date;
        user: string;
    }>;
    alerts: Array<{
        id: string;
        level: 'info' | 'warning' | 'error' | 'critical';
        title: string;
        description: string;
        timestamp: Date;
    }>;
    performanceMetrics: Array<{
        time: string;
        cpu: number;
        memory: number;
        network: number;
        activeUsers: number;
    }>;
}
