import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Unit } from './unit.entity';

export enum EquipmentType {
  WEAPON = 'weapon',            // 武器
  VEHICLE = 'vehicle',          // 车辆
  COMMUNICATION = 'communication', // 通信设备
  SURVEILLANCE = 'surveillance', // 侦察设备
  MEDICAL = 'medical',          // 医疗设备
  ENGINEERING = 'engineering',  // 工程设备
  LOGISTICS = 'logistics',      // 后勤装备
  PROTECTION = 'protection',    // 防护装备
  AMMUNITION = 'ammunition',    // 弹药
  OTHER = 'other',              // 其他
}

export enum EquipmentStatus {
  OPERATIONAL = 'operational',  // 正常
  MAINTENANCE = 'maintenance',  // 维护中
  REPAIR = 'repair',            // 修理中
  RESERVE = 'reserve',          // 储备
  DECOMMISSIONED = 'decommissioned', // 退役
  LOST = 'lost',                // 丢失
  DAMAGED = 'damaged',          // 损坏
}

@Entity('unit_equipment')
export class UnitEquipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  serialNumber: string;

  @Column({ type: 'enum', enum: EquipmentType })
  type: EquipmentType;

  @Column({ type: 'enum', enum: EquipmentStatus, default: EquipmentStatus.OPERATIONAL })
  status: EquipmentStatus;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ type: 'date', nullable: true })
  purchaseDate: Date;

  @Column({ type: 'date', nullable: true })
  lastMaintenanceDate: Date;

  @Column({ type: 'date', nullable: true })
  nextMaintenanceDate: Date;

  @Column({ nullable: true })
  maintenanceInterval: number; // 维护间隔（天）

  @Column({ nullable: true })
  operator: string;

  @Column({ type: 'json', nullable: true })
  specifications: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  maintenanceRecords: Array<{
    date: Date;
    type: string;
    description: string;
    technician: string;
    cost: number;
  }>;

  @Column({ type: 'json', nullable: true })
  deploymentRecords: Array<{
    date: Date;
    mission: string;
    location: string;
    operator: string;
    performance: string;
  }>;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Unit, unit => unit.equipment)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @Column()
  unitId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 获取装备类型显示名称
  getTypeDisplayName(): string {
    const typeNames: Record<EquipmentType, string> = {
      [EquipmentType.WEAPON]: '武器',
      [EquipmentType.VEHICLE]: '车辆',
      [EquipmentType.COMMUNICATION]: '通信设备',
      [EquipmentType.SURVEILLANCE]: '侦察设备',
      [EquipmentType.MEDICAL]: '医疗设备',
      [EquipmentType.ENGINEERING]: '工程设备',
      [EquipmentType.LOGISTICS]: '后勤装备',
      [EquipmentType.PROTECTION]: '防护装备',
      [EquipmentType.AMMUNITION]: '弹药',
      [EquipmentType.OTHER]: '其他',
    };
    return typeNames[this.type] || this.type;
  }

  // 获取装备状态显示名称
  getStatusDisplayName(): string {
    const statusNames: Record<EquipmentStatus, string> = {
      [EquipmentStatus.OPERATIONAL]: '正常',
      [EquipmentStatus.MAINTENANCE]: '维护中',
      [EquipmentStatus.REPAIR]: '修理中',
      [EquipmentStatus.RESERVE]: '储备',
      [EquipmentStatus.DECOMMISSIONED]: '退役',
      [EquipmentStatus.LOST]: '丢失',
      [EquipmentStatus.DAMAGED]: '损坏',
    };
    return statusNames[this.status] || this.status;
  }

  // 获取装备完整信息
  getFullInfo(): string {
    return `${this.name}${this.model ? `（${this.model}）` : ''}`;
  }

  // 检查装备是否可用
  isAvailable(): boolean {
    return this.status === EquipmentStatus.OPERATIONAL && this.isActive;
  }

  // 检查是否需要维护
  needsMaintenance(): boolean {
    if (!this.nextMaintenanceDate) return false;
    const nextDate = new Date(this.nextMaintenanceDate);
    const now = new Date();
    return now >= nextDate;
  }

  // 获取装备使用年限
  getAgeYears(): number {
    if (!this.purchaseDate) return 0;
    const purchaseDate = new Date(this.purchaseDate);
    const now = new Date();
    const years = now.getFullYear() - purchaseDate.getFullYear();
    const months = now.getMonth() - purchaseDate.getMonth();
    return years + (months < 0 ? -1 : 0);
  }
}
