import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Unit } from './unit.entity';

export enum DeploymentStatus {
  PLANNED = 'planned',          // 计划中
  APPROVED = 'approved',        // 已批准
  DEPLOYING = 'deploying',      // 部署中
  DEPLOYED = 'deployed',        // 已部署
  COMPLETED = 'completed',      // 已完成
  CANCELLED = 'cancelled',      // 已取消
  DELAYED = 'delayed',          // 延迟
}

export enum DeploymentPriority {
  LOW = 'low',                  // 低
  MEDIUM = 'medium',            // 中
  HIGH = 'high',                // 高
  CRITICAL = 'critical',        // 紧急
}

@Entity('deployment_records')
export class DeploymentRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  missionName: string;

  @Column({ type: 'text', nullable: true })
  missionDescription: string;

  @Column({ type: 'enum', enum: DeploymentStatus, default: DeploymentStatus.PLANNED })
  status: DeploymentStatus;

  @Column({ type: 'enum', enum: DeploymentPriority, default: DeploymentPriority.MEDIUM })
  priority: DeploymentPriority;

  @Column({ type: 'timestamp' })
  plannedStartDate: Date;

  @Column({ type: 'timestamp' })
  plannedEndDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualEndDate: Date;

  @Column()
  deploymentLocation: string;

  @Column({ nullable: true })
  coordinates: string;

  @Column({ nullable: true })
  commander: string;

  @Column({ nullable: true })
  commanderContact: string;

  @Column({ type: 'json', nullable: true })
  personnelDeployed: Array<{
    id: string;
    name: string;
    role: string;
    status: string;
  }>;

  @Column({ type: 'json', nullable: true })
  equipmentDeployed: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
  }>;

  @Column({ type: 'json', nullable: true })
  objectives: string[];

  @Column({ type: 'json', nullable: true })
  constraints: string[];

  @Column({ type: 'json', nullable: true })
  risks: Array<{
    description: string;
    probability: string;
    impact: string;
    mitigation: string;
  }>;

  @Column({ type: 'json', nullable: true })
  progressUpdates: Array<{
    date: Date;
    status: string;
    description: string;
    reporter: string;
  }>;

  @Column({ type: 'json', nullable: true })
  results: {
    objectivesAchieved: string[];
    casualties: number;
    equipmentLosses: number;
    successRate: number;
    lessonsLearned: string[];
  };

  @ManyToOne(() => Unit, unit => unit.deployments)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @Column()
  unitId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 获取部署状态显示名称
  getStatusDisplayName(): string {
    const statusNames: Record<DeploymentStatus, string> = {
      [DeploymentStatus.PLANNED]: '计划中',
      [DeploymentStatus.APPROVED]: '已批准',
      [DeploymentStatus.DEPLOYING]: '部署中',
      [DeploymentStatus.DEPLOYED]: '已部署',
      [DeploymentStatus.COMPLETED]: '已完成',
      [DeploymentStatus.CANCELLED]: '已取消',
      [DeploymentStatus.DELAYED]: '延迟',
    };
    return statusNames[this.status] || this.status;
  }

  // 获取优先级显示名称
  getPriorityDisplayName(): string {
    const priorityNames: Record<DeploymentPriority, string> = {
      [DeploymentPriority.LOW]: '低',
      [DeploymentPriority.MEDIUM]: '中',
      [DeploymentPriority.HIGH]: '高',
      [DeploymentPriority.CRITICAL]: '紧急',
    };
    return priorityNames[this.priority] || this.priority;
  }

  // 获取部署时长（天）
  getDeploymentDuration(): number {
    const start = this.actualStartDate ? new Date(this.actualStartDate) : new Date(this.plannedStartDate);
    const end = this.actualEndDate ? new Date(this.actualEndDate) : new Date(this.plannedEndDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return duration > 0 ? duration : 0;
  }

  // 检查部署是否进行中
  isInProgress(): boolean {
    return [
      DeploymentStatus.DEPLOYING,
      DeploymentStatus.DEPLOYED
    ].includes(this.status);
  }

  // 检查部署是否已完成
  isCompleted(): boolean {
    return this.status === DeploymentStatus.COMPLETED;
  }

  // 获取部署进度百分比
  getProgressPercentage(): number {
    if (this.isCompleted()) return 100;
    if (!this.isInProgress()) return 0;
    
    const start = new Date(this.plannedStartDate);
    const end = new Date(this.plannedEndDate);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(100, Math.round((elapsed / totalDuration) * 100));
  }

  // 获取部署摘要
  getDeploymentSummary(): string {
    return `${this.missionName} - ${this.getStatusDisplayName()} - ${this.deploymentLocation}`;
  }
}
