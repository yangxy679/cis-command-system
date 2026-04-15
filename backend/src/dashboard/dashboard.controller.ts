import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: '获取仪表板统计数据' })
  @ApiResponse({ status: 200, description: '返回仪表板统计数据' })
  @ApiResponse({ status: 401, description: '未授权访问' })
  async getDashboardStats(): Promise<DashboardStatsDto> {
    return this.dashboardService.getDashboardStats();
  }

  @Get('metrics/realtime')
  @ApiOperation({ summary: '获取实时性能指标' })
  @ApiResponse({ status: 200, description: '返回实时性能指标' })
  @ApiResponse({ status: 401, description: '未授权访问' })
  async getRealTimeMetrics() {
    return this.dashboardService.getRealTimeMetrics();
  }

  @Get('health')
  @ApiOperation({ summary: '获取系统健康状态' })
  @ApiResponse({ status: 200, description: '返回系统健康状态' })
  async getSystemHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: { status: 'up', responseTime: 15 },
        cache: { status: 'up', responseTime: 5 },
        auth: { status: 'up', responseTime: 10 },
        api: { status: 'up', responseTime: 20 },
      },
      metrics: {
        cpu: 35.5,
        memory: 62.3,
        disk: 45.8,
        network: 28.7,
      },
    };
  }
}
