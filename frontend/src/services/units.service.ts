import axios from 'axios';
import { authHeader } from './auth.service';

const API_URL = 'http://localhost:3000/api';

export interface Unit {
  id: string;
  name: string;
  code: string;
  type: string;
  level: string;
  status: string;
  description?: string;
  location?: string;
  commander?: string;
  commanderRank?: string;
  commanderContact?: string;
  personnelCount: number;
  equipmentCount: number;
  capabilities?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnitsResponse {
  data: Unit[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateUnitData {
  name: string;
  code: string;
  type: string;
  level: string;
  description?: string;
  location?: string;
  commander?: string;
  commanderRank?: string;
  commanderContact?: string;
  capabilities?: string[];
}

export interface UpdateUnitData {
  name?: string;
  code?: string;
  type?: string;
  level?: string;
  description?: string;
  location?: string;
  commander?: string;
  commanderRank?: string;
  commanderContact?: string;
  capabilities?: string[];
  isActive?: boolean;
}

class UnitsService {
  async getUnits(params: any = {}): Promise<UnitsResponse> {
    // 模拟数据
    return {
      data: [
        {
          id: '1',
          name: '第一装甲营',
          code: '1ST_ARMOR_BATTALION',
          type: 'armor',
          level: 'battalion',
          status: 'standby',
          description: '主要装甲作战单位',
          location: '北京军区',
          commander: '张建国',
          commanderRank: '上校',
          commanderContact: '13800138000',
          personnelCount: 500,
          equipmentCount: 120,
          capabilities: ['装甲突击', '火力支援', '快速机动'],
          isActive: true,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-04-01'),
        },
        {
          id: '2',
          name: '特种作战大队',
          code: 'SPECIAL_FORCES_BRIGADE',
          type: 'special_forces',
          level: 'brigade',
          status: 'training',
          description: '特种作战精英部队',
          location: '成都军区',
          commander: '王强',
          commanderRank: '大校',
          commanderContact: '13900139000',
          personnelCount: 800,
          equipmentCount: 300,
          capabilities: ['特种侦察', '反恐作战', '人质营救'],
          isActive: true,
          createdAt: new Date('2024-02-20'),
          updatedAt: new Date('2024-04-05'),
        },
      ],
      meta: {
        total: 2,
        page: 1,
        limit: 20,
        totalPages: 1,
      },
    };
  }

  async getUnitById(id: string): Promise<Unit> {
    // 模拟数据
    return {
      id,
      name: '第一装甲营',
      code: '1ST_ARMOR_BATTALION',
      type: 'armor',
      level: 'battalion',
      status: 'standby',
      description: '主要装甲作战单位',
      location: '北京军区',
      commander: '张建国',
      commanderRank: '上校',
      commanderContact: '13800138000',
      personnelCount: 500,
      equipmentCount: 120,
      capabilities: ['装甲突击', '火力支援', '快速机动'],
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-04-01'),
    };
  }

  async createUnit(unitData: CreateUnitData): Promise<Unit> {
    // 模拟创建
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...unitData,
      status: 'standby',
      personnelCount: 0,
      equipmentCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateUnit(id: string, unitData: UpdateUnitData): Promise<Unit> {
    // 模拟更新
    const unit = await this.getUnitById(id);
    return {
      ...unit,
      ...unitData,
      updatedAt: new Date(),
    };
  }

  async deleteUnit(id: string): Promise<void> {
    // 模拟删除
    console.log(`删除单位: ${id}`);
  }

  // 单位类型显示名称
  getUnitTypeDisplayName(type: string): string {
    const typeMap: Record<string, string> = {
      'infantry': '步兵',
      'armor': '装甲',
      'artillery': '炮兵',
      'engineer': '工兵',
      'signal': '通信',
      'medical': '医疗',
      'logistics': '后勤',
      'special_forces': '特种部队',
      'aviation': '航空兵',
      'navy': '海军',
    };
    return typeMap[type] || type;
  }

  // 单位状态显示名称
  getUnitStatusDisplayName(status: string): string {
    const statusMap: Record<string, string> = {
      'standby': '待命',
      'deployed': '已部署',
      'training': '训练中',
      'maintenance': '维护中',
      'combat': '作战中',
      'disabled': '禁用',
    };
    return statusMap[status] || status;
  }

  // 获取单位状态颜色
  getUnitStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'standby': 'blue',
      'deployed': 'green',
      'training': 'orange',
      'maintenance': 'yellow',
      'combat': 'red',
      'disabled': 'gray',
    };
    return colorMap[status] || 'default';
  }
}

export default new UnitsService();
