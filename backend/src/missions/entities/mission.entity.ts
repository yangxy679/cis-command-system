import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Unit } from '../../units/entities/unit.entity';
import { User } from '../../auth/entities/user.entity';

export enum MissionStatus {
  DRAFT = 'draft',           // 草稿
  PLANNED = 'planned',       // 已计划
  APPROVED = 'approved',     // 已批准
  IN_PROGRESS = 'in_progress', // 进行中
  COMPLETED = 'completed',   // 已完成
  CANCELLED = 'cancelled',   // 已取消
  DELAYED = 'delayed',       // 延迟
  FAILED = 'failed',         // 失败
}

export enum MissionPriority {
  LOW = 'low',              // 低
  MEDIUM = 'medium',        // 中
  HIGH = 'high',            // 高
  CRITICAL = 'critical',    // 紧急
}

export enum MissionType {
  COMBAT = 'combat',        // 作战任务
  TRAINING = 'training',    // 训练任务
  PATROL = 'patrol',        // 巡逻任务
  SECURITY = 'security',    // 安保任务
  RESCUE = 'rescue',        // 救援任务
  LOGISTICS = 'logistics',  // 后勤任务
  INTELLIGENCE = 'intelligence', // 情报任务
  OTHER = 'other',          // 其他任务
}

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 100, unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: MissionType,
    default: MissionType.COMBAT,
  })
  type: MissionType;

  @Column({
    type: 'enum',
    enum: MissionStatus,
    default: MissionStatus.DRAFT,
  })
  status: MissionStatus;

  @Column({
    type: 'enum',
    enum: MissionPriority,
    default: MissionPriority.MEDIUM,
  })
  priority: MissionPriority;

  @Column({ type: 'jsonb', nullable: true })
  objectives: string[];

  @Column({ type: 'jsonb', nullable: true })
  constraints: string[];

  @Column({ type: 'jsonb', nullable: true })
  requirements: string[];

  @Column({ type: 'timestamp' })
  plannedStartDate: Date;

  @Column({ type: 'timestamp' })
  plannedEndDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualEndDate: Date;

  @Column({ length: 200 })
  location: string;

  @Column({ length: 50, nullable: true })
  coordinates: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  estimatedDuration: number; // 小时

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  actualDuration: number; // 小时

  @Column({ type: 'int', default: 0 })
  estimatedCost: number;

  @Column({ type: 'int', default: 0 })
  actualCost: number;

  @Column({ type: 'int', default: 0 })
  estimatedPersonnel: number;

  @Column({ type: 'int', default: 0 })
  actualPersonnel: number;

  @Column({ type: 'int', default: 0 })
  estimatedEquipment: number;

  @Column({ type: 'int', default: 0 })
  actualEquipment: number;

  // 关联单位
  @Column({ nullable: true })
  unitId: string;

  @ManyToOne(() => Unit, { nullable: true })
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  // 创建者
  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  // 负责人
  @Column({ nullable: true })
  assignedToId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: User;

  // 审批人
  @Column({ nullable: true })
  approvedById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedById' })
  approvedBy: User;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column({ type: 'text', nullable: true })
  approvalNotes: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ type: 'jsonb', nullable: true })
  attachments: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({ type: 'jsonb', nullable: true })
  dependencies: string[]; // 依赖的任务ID

  @Column({ type: 'jsonb', nullable: true })
  risks: Array<{
    description: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
  }>;

  @Column({ type: 'jsonb', nullable: true })
  milestones: Array<{
    name: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    completedAt: Date | null;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 获取任务状态显示名称
  getStatusDisplayName(): string {
    const statusNames: Record<MissionStatus, string> = {
      [MissionStatus.DRAFT]: '草稿',
      [MissionStatus.PLANNED]: '已计划',
      [MissionStatus.APPROVED]: '已批准',
      [MissionStatus.IN_PROGRESS]: '进行中',
      [MissionStatus.COMPLETED]: '已完成',
      [MissionStatus.CANCELLED]: '已取消',
      [MissionStatus.DELAYED]: '延迟',
      [MissionStatus.FAILED]: '失败',
    };
    return statusNames[this.status];
  }

  // 获取任务类型显示名称
  getTypeDisplayName(): string {
    const typeNames: Record<MissionType, string> = {
      [MissionType.COMBAT]: '作战任务',
      [MissionType.TRAINING]: '训练任务',
      [MissionType.PATROL]: '巡逻任务',
      [MissionType.SECURITY]: '安保任务',
      [MissionType.RESCUE]: '救援任务',
      [MissionType.LOGISTICS]: '后勤任务',
      [MissionType.INTELLIGENCE]: '情报任务',
      [MissionType.OTHER]: '其他任务',
    };
    return typeNames[this.type];
  }

  // 获取优先级显示名称
  getPriorityDisplayName(): string {
    const priorityNames: Record<MissionPriority, string> = {
      [MissionPriority.LOW]: '低',
      [MissionPriority.MEDIUM]: '中',
      [MissionPriority.HIGH]: '高',
      [MissionPriority.CRITICAL]: '紧急',
    };
    return priorityNames[this.priority];
  }

  // 检查任务是否可开始
  canStart(): boolean {
    return this.status === MissionStatus.APPROVED && !this.isArchived;
  }

  // 检查任务是否可完成
  canComplete(): boolean {
    return this.status === MissionStatus.IN_PROGRESS && !this.isArchived;
  }

  // 检查任务是否可取消
  canCancel(): boolean {
    return [MissionStatus.DRAFT, MissionStatus.PLANNED, MissionStatus.APPROVED, MissionStatus.IN_PROGRESS]
      .includes(this.status) && !this.isArchived;
  }

  // 计算进度百分比
  calculateProgress(): number {
    if (this.status === MissionStatus.COMPLETED) return 100;
    if (this.status === MissionStatus.CANCELLED || this.status === MissionStatus.FAILED) return 0;
    
    if (this.milestones && this.milestones.length > 0) {
      const completed = this.milestones.filter(m => m.completed).length;
      return Math.round((completed / this.milestones.length) * 100);
    }
    
    // 基于时间估算
    if (this.plannedStartDate && this.plannedEndDate) {
      const totalDuration = this.plannedEndDate.getTime() - this.plannedStartDate.getTime();
      const elapsed = Date.now() - this.plannedStartDate.getTime();
      return Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
    }
    
    return 0;
  }

  // 检查是否延迟
  isDelayed(): boolean {
    if (this.status === MissionStatus.COMPLETED || this.status === MissionStatus.CANCELLED) {
      return false;
    }
    
    if (this.plannedEndDate && new Date() > this.plannedEndDate) {
      return true;
    }
    
    return false;
  }

  // 获取延迟天数
  getDelayDays(): number {
    if (!this.isDelayed() || !this.plannedEndDate) return 0;
    
    const now = new Date();
    const endDate = new Date(this.plannedEndDate);
    const diffTime = Math.abs(now.getTime() - endDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
