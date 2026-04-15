import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Unit } from './unit.entity';

export enum PersonnelRole {
  COMMANDER = 'commander',      // 指挥员
  DEPUTY_COMMANDER = 'deputy_commander', // 副指挥员
  OPERATOR = 'operator',        // 操作员
  TECHNICIAN = 'technician',    // 技术员
  MEDIC = 'medic',              // 医疗兵
  LOGISTICS = 'logistics',      // 后勤人员
  INTELLIGENCE = 'intelligence', // 情报员
  COMMUNICATION = 'communication', // 通信员
  DRIVER = 'driver',            // 驾驶员
  GUNNER = 'gunner',            // 炮手
  INFANTRY = 'infantry',        // 步兵
}

export enum PersonnelStatus {
  ACTIVE = 'active',            // 在岗
  ON_LEAVE = 'on_leave',        // 休假
  TRAINING = 'training',        // 培训
  MEDICAL = 'medical',          // 医疗
  TRANSFERRED = 'transferred',  // 调离
  RETIRED = 'retired',          // 退役
}

@Entity('unit_personnel')
export class UnitPersonnel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  militaryId: string;

  @Column({ type: 'enum', enum: PersonnelRole })
  role: PersonnelRole;

  @Column({ nullable: true })
  rank: string;

  @Column({ type: 'enum', enum: PersonnelStatus, default: PersonnelStatus.ACTIVE })
  status: PersonnelStatus;

  @Column({ nullable: true })
  specialty: string;

  @Column({ nullable: true })
  qualifications: string;

  @Column({ type: 'date', nullable: true })
  joinDate: Date;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ type: 'json', nullable: true })
  trainingRecords: Array<{
    date: Date;
    course: string;
    result: string;
    certificate: string;
  }>;

  @Column({ type: 'json', nullable: true })
  deploymentRecords: Array<{
    date: Date;
    mission: string;
    location: string;
    role: string;
    performance: string;
  }>;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Unit, unit => unit.personnel)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @Column()
  unitId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 获取角色显示名称
  getRoleDisplayName(): string {
    const roleNames: Record<PersonnelRole, string> = {
      [PersonnelRole.COMMANDER]: '指挥员',
      [PersonnelRole.DEPUTY_COMMANDER]: '副指挥员',
      [PersonnelRole.OPERATOR]: '操作员',
      [PersonnelRole.TECHNICIAN]: '技术员',
      [PersonnelRole.MEDIC]: '医疗兵',
      [PersonnelRole.LOGISTICS]: '后勤人员',
      [PersonnelRole.INTELLIGENCE]: '情报员',
      [PersonnelRole.COMMUNICATION]: '通信员',
      [PersonnelRole.DRIVER]: '驾驶员',
      [PersonnelRole.GUNNER]: '炮手',
      [PersonnelRole.INFANTRY]: '步兵',
    };
    return roleNames[this.role] || this.role;
  }

  // 获取状态显示名称
  getStatusDisplayName(): string {
    const statusNames: Record<PersonnelStatus, string> = {
      [PersonnelStatus.ACTIVE]: '在岗',
      [PersonnelStatus.ON_LEAVE]: '休假',
      [PersonnelStatus.TRAINING]: '培训',
      [PersonnelStatus.MEDICAL]: '医疗',
      [PersonnelStatus.TRANSFERRED]: '调离',
      [PersonnelStatus.RETIRED]: '退役',
    };
    return statusNames[this.status] || this.status;
  }

  // 获取人员完整信息
  getFullInfo(): string {
    return `${this.rank || ''}${this.name}（${this.getRoleDisplayName()}）`;
  }

  // 检查人员是否在岗
  isOnDuty(): boolean {
    return this.status === PersonnelStatus.ACTIVE && this.isActive;
  }

  // 获取服役年限
  getServiceYears(): number {
    if (!this.joinDate) return 0;
    const joinDate = new Date(this.joinDate);
    const now = new Date();
    const years = now.getFullYear() - joinDate.getFullYear();
    const months = now.getMonth() - joinDate.getMonth();
    return years + (months < 0 ? -1 : 0);
  }
}
