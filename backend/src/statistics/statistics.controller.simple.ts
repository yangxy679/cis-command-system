import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatisticsServiceSimple } from './statistics.service.simple';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsControllerSimple {
  constructor(private readonly statisticsService: StatisticsServiceSimple) {}

  @Get('system-usage')
  async getSystemUsageStatistics() {
    return this.statisticsService.getSystemUsageStatistics();
  }

  @Get('user-activity')
  async getUserActivityStatistics() {
    return this.statisticsService.getUserActivityStatistics();
  }

  @Get('mission-performance')
  async getMissionPerformanceStatistics() {
    return this.statisticsService.getMissionPerformanceStatistics();
  }

  @Get('unit-readiness')
  async getUnitReadinessStatistics() {
    return this.statisticsService.getUnitReadinessStatistics();
  }

  @Get('cost-analysis')
  async getCostAnalysisStatistics() {
    return this.statisticsService.getCostAnalysisStatistics();
  }

  @Get('risk-assessment')
  async getRiskAssessmentStatistics() {
    return this.statisticsService.getRiskAssessmentStatistics();
  }

  @Get('comprehensive-report')
  async getComprehensiveReport() {
    return this.statisticsService.getComprehensiveReport();
  }

  @Get('dashboard')
  async getDashboardStatistics() {
    const [
      systemUsage,
      missionPerformance,
      unitReadiness,
      costAnalysis,
    ] = await Promise.all([
      this.statisticsService.getSystemUsageStatistics(),
      this.statisticsService.getMissionPerformanceStatistics(),
      this.statisticsService.getUnitReadinessStatistics(),
      this.statisticsService.getCostAnalysisStatistics(),
    ]);

    return {
      systemHealth: {
        activeUsers: systemUsage.users.active,
        activeMissions: systemUsage.missions.active,
        deployedUnits: unitReadiness.readiness.deployed,
        systemUptime: 99.8,
      },
      missionMetrics: {
        successRate: missionPerformance.performance.successRate,
        delayedMissions: missionPerformance.performance.delayed,
        avgCost: missionPerformance.cost.avgActual,
        completionRate: (missionPerformance.performance.completed / missionPerformance.performance.total * 100).toFixed(1),
      },
      unitMetrics: {
        totalUnits: unitReadiness.readiness.totalUnits,
        readinessRate: ((unitReadiness.readiness.standby + unitReadiness.readiness.deployed) / unitReadiness.readiness.totalUnits * 100).toFixed(1),
        avgDeploymentTime: unitReadiness.readiness.avgDeploymentTime,
        maintenanceUnits: unitReadiness.readiness.maintenance,
      },
      costMetrics: {
        totalCost: costAnalysis.summary.totalActual,
        costEfficiency: costAnalysis.costEfficiency.overall,
        costOverrun: costAnalysis.summary.overrunPercentage,
        avgCostPerMission: missionPerformance.cost.avgActual,
      },
      recentActivity: {
        newUsers: systemUsage.users.growth[systemUsage.users.growth.length - 1]?.count || 0,
        newMissions: systemUsage.missions.growth[systemUsage.missions.growth.length - 1]?.count || 0,
        recentDeployments: unitReadiness.deploymentStats.find(d => d.status === 'deployed')?.count || 0,
        completedMissions: missionPerformance.performance.completed,
      },
    };
  }
}
