import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum StatisticsType {
  SYSTEM_USAGE = 'system_usage',      // 系统使用统计
  USER_ACTIVITY = 'user_activity',    // 用户活动统计
  MISSION_PERFORMANCE = 'mission_performance', // 任务性能统计
  UNIT_READINESS = 'unit_readiness',  // 单位战备统计
  COST_ANALYSIS = 'cost_analysis',    // 成本分析统计
  RISK_ASSESSMENT = 'risk_assessment', // 风险评估统计
}

@Entity('statistics')
export class Statistics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: StatisticsType,
  })
  type: StatisticsType;

  @Column({ type: 'jsonb' })
  data: any;

  @Column({ type: 'timestamp' })
  periodStart: Date;

  @Column({ type: 'timestamp' })
  periodEnd: Date;

  @CreateDateColumn()
  createdAt: Date;

  // 获取统计类型显示名称
  getTypeDisplayName(): string {
    const typeNames: Record<StatisticsType, string> = {
      [StatisticsType.SYSTEM_USAGE]: '系统使用统计',
      [StatisticsType.USER_ACTIVITY]: '用户活动统计',
      [StatisticsType.MISSION_PERFORMANCE]: '任务性能统计',
      [StatisticsType.UNIT_READINESS]: '单位战备统计',
      [StatisticsType.COST_ANALYSIS]: '成本分析统计',
      [StatisticsType.RISK_ASSESSMENT]: '风险评估统计',
    };
    return typeNames[this.type];
  }

  // 格式化统计周期
  getPeriodDisplay(): string {
    const start = new Date(this.periodStart);
    const end = new Date(this.periodEnd);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('zh-CN');
    };
    
    return `${formatDate(start)} 至 ${formatDate(end)}`;
  }

  // 获取统计摘要
  getSummary(): string {
    switch (this.type) {
      case StatisticsType.SYSTEM_USAGE:
        return `系统使用统计：${this.data.totalUsers || 0} 用户，${this.data.totalMissions || 0} 任务`;
      
      case StatisticsType.USER_ACTIVITY:
        return `用户活动统计：${this.data.activeUsers || 0} 活跃用户`;
      
      case StatisticsType.MISSION_PERFORMANCE:
        return `任务性能统计：成功率 ${this.data.successRate || 0}%`;
      
      case StatisticsType.UNIT_READINESS:
        return `单位战备统计：平均战备率 ${this.data.averageReadiness || 0}%`;
      
      case StatisticsType.COST_ANALYSIS:
        return `成本分析统计：总成本 ${this.data.totalCost || 0} 元`;
      
      case StatisticsType.RISK_ASSESSMENT:
        return `风险评估统计：${this.data.highRisks || 0} 个高风险`;
      
      default:
        return '统计摘要';
    }
  }
}
