import { DashboardStatsDto } from './dto/dashboard-stats.dto';
export declare class DashboardService {
    getDashboardStats(): Promise<DashboardStatsDto>;
    getRealTimeMetrics(): Promise<{
        timestamp: string;
        cpu: number;
        memory: number;
        network: number;
        activeSessions: number;
        responseTime: number;
    }>;
}
