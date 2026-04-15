import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardStats(): Promise<DashboardStatsDto>;
    getRealTimeMetrics(): Promise<{
        timestamp: string;
        cpu: number;
        memory: number;
        network: number;
        activeSessions: number;
        responseTime: number;
    }>;
    getSystemHealth(): Promise<{
        status: string;
        timestamp: string;
        services: {
            database: {
                status: string;
                responseTime: number;
            };
            cache: {
                status: string;
                responseTime: number;
            };
            auth: {
                status: string;
                responseTime: number;
            };
            api: {
                status: string;
                responseTime: number;
            };
        };
        metrics: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    }>;
}
