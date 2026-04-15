import { Injectable } from '@nestjs/common';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
  async getDashboardStats(): Promise<DashboardStatsDto> {
    // 模拟实时数据
    const now = new Date();
    const performanceMetrics = [];
    
    // 生成最近10分钟的性能数据
    for (let i = 9; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000);
      performanceMetrics.push({
        time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
        cpu: 20 + Math.random() * 40,
        memory: 40 + Math.random() * 30,
        network: 10 + Math.random() * 50,
        activeUsers: 30 + Math.floor(Math.random() * 20),
      });
    }

    return {
      onlineUsers: 42 + Math.floor(Math.random() * 10),
      combatUnits: 8,
      activeMissions: 15 + Math.floor(Math.random() * 5),
      systemHealth: 95 + Math.random() * 5,
      
      cpuUsage: 35 + Math.random() * 20,
      memoryUsage: 45 + Math.random() * 25,
      networkTraffic: 25 + Math.random() * 30,
      storageUsage: 60 + Math.random() * 20,
      
      recentActivities: [
        {
          id: '1',
          type: 'user_login',
          description: '用户登录系统',
          timestamp: new Date(now.getTime() - 5 * 60000),
          user: '指挥员张三',
        },
        {
          id: '2',
          type: 'mission_created',
          description: '创建新的作战任务',
          timestamp: new Date(now.getTime() - 15 * 60000),
          user: '作战指挥官李四',
        },
        {
          id: '3',
          type: 'system_alert',
          description: '系统性能优化完成',
          timestamp: new Date(now.getTime() - 30 * 60000),
          user: '系统管理员',
        },
        {
          id: '4',
          type: 'data_export',
          description: '导出作战数据报告',
          timestamp: new Date(now.getTime() - 45 * 60000),
          user: '数据分析师王五',
        },
        {
          id: '5',
          type: 'unit_deployed',
          description: '作战单位部署完成',
          timestamp: new Date(now.getTime() - 60 * 60000),
          user: '部署工程师赵六',
        },
      ],
      
      alerts: [
        {
          id: 'alert-1',
          level: 'info',
          title: '系统维护通知',
          description: '计划于今晚23:00进行系统维护',
          timestamp: new Date(now.getTime() - 120 * 60000),
        },
        {
          id: 'alert-2',
          level: 'warning',
          title: '内存使用率较高',
          description: '系统内存使用率达到75%，建议优化',
          timestamp: new Date(now.getTime() - 90 * 60000),
        },
      ],
      
      performanceMetrics,
    };
  }

  async getRealTimeMetrics() {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      cpu: 30 + Math.random() * 30,
      memory: 40 + Math.random() * 25,
      network: 20 + Math.random() * 40,
      activeSessions: 35 + Math.floor(Math.random() * 15),
      responseTime: 50 + Math.random() * 100,
    };
  }
}
