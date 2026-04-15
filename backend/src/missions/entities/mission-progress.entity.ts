import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Mission } from './mission.entity';
import { User } from '../../auth/entities/user.entity';

export enum ProgressType {
  STATUS_CHANGE = 'status_change',     // 状态变更
  MILESTONE_COMPLETE = 'milestone_complete', // 里程碑完成
  COMMENT = 'comment',                 // 评论
  ATTACHMENT = 'attachment',           // 附件
  RISK_UPDATE = 'risk_update',         // 风险更新
  COST_UPDATE = 'cost_update',         // 成本更新
  SCHEDULE_UPDATE = 'schedule_update', // 进度更新
  OTHER = 'other',                     // 其他
}

@Entity('mission_progress')
export class MissionProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  missionId: string;

  @ManyToOne(() => Mission)
  @JoinColumn({ name: 'missionId' })
  mission: Mission;

  @Column({
    type: 'enum',
    enum: ProgressType,
    default: ProgressType.COMMENT,
  })
  type: ProgressType;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  // 获取进度类型显示名称
  getTypeDisplayName(): string {
    const typeNames: Record<ProgressType, string> = {
      [ProgressType.STATUS_CHANGE]: '状态变更',
      [ProgressType.MILESTONE_COMPLETE]: '里程碑完成',
      [ProgressType.COMMENT]: '评论',
      [ProgressType.ATTACHMENT]: '附件',
      [ProgressType.RISK_UPDATE]: '风险更新',
      [ProgressType.COST_UPDATE]: '成本更新',
      [ProgressType.SCHEDULE_UPDATE]: '进度更新',
      [ProgressType.OTHER]: '其他',
    };
    return typeNames[this.type];
  }

  // 格式化显示内容
  getDisplayContent(): string {
    switch (this.type) {
      case ProgressType.STATUS_CHANGE:
        const { from, to } = this.metadata || {};
        return `任务状态从"${from}"变更为"${to}"`;
      
      case ProgressType.MILESTONE_COMPLETE:
        const { milestoneName } = this.metadata || {};
        return `完成里程碑: ${milestoneName}`;
      
      case ProgressType.RISK_UPDATE:
        const { riskDescription } = this.metadata || {};
        return `更新风险: ${riskDescription}`;
      
      case ProgressType.COST_UPDATE:
        const { oldCost, newCost } = this.metadata || {};
        return `成本从 ${oldCost} 更新为 ${newCost}`;
      
      case ProgressType.SCHEDULE_UPDATE:
        const { oldDate, newDate } = this.metadata || {};
        return `计划时间从 ${oldDate} 更新为 ${newDate}`;
      
      default:
        return this.content;
    }
  }
}
