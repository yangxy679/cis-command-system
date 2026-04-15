import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UnitPersonnel } from './unit-personnel.entity';
import { UnitEquipment } from './unit-equipment.entity';
import { DeploymentRecord } from './deployment-record.entity';

export enum UnitType {
  INFANTRY = 'infantry',        // 步兵
  ARMOR = 'armor',              // 装甲
  ARTILLERY = 'artillery',      // 炮兵
  ENGINEER = 'engineer',        // 工兵
  SIGNAL = 'signal',            // 通信
  MEDICAL = 'medical',          // 医疗
  LOGISTICS = 'logistics',      // 后勤
  SPECIAL_FORCES = 'special_forces', // 特种部队
  AVIATION = 'aviation',        // 航空兵
  NAVY = 'navy',                // 海军
}

export enum UnitStatus {
  STANDBY = 'standby',          // 待命
  DEPLOYED = 'deployed',        // 已部署
  TRAINING = 'training',        // 训练中
  MAINTENANCE = 'maintenance',  // 维护中
  COMBAT = 'combat',            // 作战中
  DISABLED = 'disabled',        // 禁用
}

export enum UnitLevel {
  SQUAD = 'squad',              // 班
  PLATOON = 'platoon',          // 排
  COMPANY = 'company',          // 连
  BATTALION = 'battalion',      // 营
  REGIMENT = 'regiment',        // 团
  BRIGADE = 'brigade',          // 旅
  DIVISION = 'division',        // 师
  CORPS = 'corps',              // 军
}

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'enum', enum: UnitType })
  type: UnitType;

  @Column({ type: 'enum', enum: UnitLevel })
  level: UnitLevel;

  @Column({ type: 'enum', enum: UnitStatus, default: UnitStatus.STANDBY })
  status: UnitStatus;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  commander: string;

  @Column({ nullable: true })
  commanderRank: string;

  @Column({ nullable: true })
  commanderContact: string;

  @Column({ default: 0 })
  personnelCount: number;

  @Column({ default: 0 })
  equipmentCount: number;

  @Column({ type: 'json', nullable: true })
  capabilities: string[];

  @Column({ type: 'json', nullable: true })
  deploymentHistory: Array<{
    date: Date;
    location: string;
    mission: string;
    status: string;
  }>;

  @Column({ type: 'json', nullable: true })
  statistics: {
    missionsCompleted: number;
    missionsActive: number;
    successRate: number;
    averageResponseTime: number;
    lastDeploymentDate: Date;
  };

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UnitPersonnel, personnel => personnel.unit)
  personnel: UnitPersonnel[];

  @OneToMany(() => UnitEquipment, equipment => equipment.unit)
  equipment: UnitEquipment[];

  @OneToMany(() => DeploymentRecord, deployment => deployment.unit)
  deployments: DeploymentRecord[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 获取单位类型显示名称
  getTypeDisplayName(): string {
    const typeNames: Record<UnitType, string> = {
      [UnitType.INFANTRY]: '步兵',
      [UnitType.ARMOR]: '装甲',
      [UnitType.ARTILLERY]: '炮兵',
      [UnitType.ENGINEER]: '工兵',
      [UnitType.SIGNAL]: '通信',
      [UnitType.MEDICAL]: '医疗',
      [UnitType.LOGISTICS]: '后勤',
      [UnitType.SPECIAL_FORCES]: '特种部队',
      [UnitType.AVIATION]: '航空兵',
      [UnitType.NAVY]: '海军',
    };
    return typeNames[this.type] || this.type;
  }

  // 获取单位状态显示名称
  getStatusDisplayName(): string {
    const statusNames: Record<UnitStatus, string> = {
      [UnitStatus.STANDBY]: '待命',
      [UnitStatus.DEPLOYED]: '已部署',
      [UnitStatus.TRAINING]: '训练中',
      [UnitStatus.MAINTENANCE]: '维护中',
      [UnitStatus.COMBAT]: '作战中',
      [UnitStatus.DISABLED]: '禁用',
    };
    return statusNames[this.status] || this.status;
  }

  // 获取单位级别显示名称
  getLevelDisplayName(): string {
    const levelNames: Record<UnitLevel, string> = {
      [UnitLevel.SQUAD]: '班',
      [UnitLevel.PLATOON]: '排',
      [UnitLevel.COMPANY]: '连',
      [UnitLevel.BATTALION]: '营',
      [UnitLevel.REGIMENT]: '团',
      [UnitLevel.BRIGADE]: '旅',
      [UnitLevel.DIVISION]: '师',
      [UnitLevel.CORPS]: '军',
    };
    return levelNames[this.level] || this.level;
  }

  // 检查单位是否可部署
  canDeploy(): boolean {
    return this.status === UnitStatus.STANDBY && this.isActive;
  }

  // 获取单位完整名称
  getFullName(): string {
    return `${this.getLevelDisplayName()}${this.name}（${this.code}）`;
  }
}
