import axios from 'axios';
import { authHeader } from './auth.service';

const API_URL = 'http://localhost:3000/api';

export interface Mission {
  id: string;
  name: string;
  code: string;
  description?: string;
  type: string;
  status: string;
  priority: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  location: string;
  estimatedCost: number;
  estimatedPersonnel: number;
  unitId?: string;
  createdById: string;
  assignedToId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MissionsResponse {
  data: Mission[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MissionStatistics {
  total: number;
  active: number;
  delayed: number;
  upcoming: number;
}

class MissionsServiceSimple {
  async getMissions(params: any = {}): Promise<MissionsResponse> {
    // 模拟数据
    return {
      data: [
        {
          id: '1',
          name: '边境巡逻任务',
          code: 'BORDER_PATROL_001',
          description: '中印边境东段日常巡逻任务',
          type: 'patrol',
          status: 'in_progress',
          priority: 'high',
          plannedStartDate: new Date('2024-04-01'),
          plannedEndDate: new Date('2024-04-30'),
          location: '中印边境东段',
          estimatedCost: 500000,
          estimatedPersonnel: 50,
          unitId: '1',
          createdById: '1',
          assignedToId: '2',
          isActive: true,
          createdAt: new Date('2024-03-20'),
          updatedAt: new Date('2024-04-08'),
        },
        {
          id: '2',
          name: '特种作战训练',
          code: 'SPECIAL_TRAINING_001',
          description: '特种部队反恐作战训练',
          type: 'training',
          status: 'planned',
          priority: 'medium',
          plannedStartDate: new Date('2024-04-15'),
          plannedEndDate: new Date('2024-04-20'),
          location: '成都军区训练基地',
          estimatedCost: 200000,
          estimatedPersonnel: 30,
          createdById: '1',
          isActive: true,
          createdAt: new Date('2024-04-05'),
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

  async getMissionStatistics(): Promise<MissionStatistics> {
    // 模拟数据
    return {
      total: 2,
      active: 2,
      delayed: 0,
      upcoming: 1,
    };
  }

  async getMissionById(id: string): Promise<Mission> {
    // 模拟数据
    return {
      id,
      name: '边境巡逻任务',
      code: 'BORDER_PATROL_001',
      description: '中印边境东段日常巡逻任务',
      type: 'patrol',
      status: 'in_progress',
      priority: 'high',
      plannedStartDate: new Date('2024-04-01'),
      plannedEndDate: new Date('2024-04-30'),
      location: '中印边境东段',
      estimatedCost: 500000,
      estimatedPersonnel: 50,
      unitId: '1',
      createdById: '1',
      assignedToId: '2',
      isActive: true,
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-04-08'),
    };
  }

  async createMission(missionData: any): Promise<Mission> {
    // 模拟创建
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...missionData,
      status: 'draft',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateMission(id: string, missionData: any): Promise<Mission> {
    // 模拟更新
    const mission = await this.getMissionById(id);
    return {
      ...mission,
      ...missionData,
      updatedAt: new Date(),
    };
  }

  async deleteMission(id: string): Promise<void> {
    // 模拟删除
    console.log(`删除任务: ${id}`);
  }

  // 任务类型枚举
  getMissionTypes(): Array<{ value: string; label: string }> {
    return [
      { value: 'combat', label: '作战任务' },
      { value: 'training', label: '训练任务' },
      { value: 'patrol', label: '巡逻任务' },
      { value: 'security', label: '安保任务' },
      { value: 'rescue', label: '救援任务' },
      { value: 'logistics', label: '后勤任务' },
      { value: 'intelligence', label: '情报任务' },
      { value: 'other', label: '其他任务' },
    ];
  }

  // 任务状态枚举
  getMissionStatuses(): Array<{ value: string; label: string }> {
    return [
      { value: 'draft', label: '草稿' },
      { value: 'planned', label: '已计划' },
      { value: 'approved', label: '已批准' },
      { value: 'in_progress', label: '进行中' },
      { value: 'completed', label: '已完成' },
      { value: 'cancelled', label: '已取消' },
      { value: 'delayed', label: '延迟' },
    ];
  }

  // 任务优先级枚举
  getMissionPriorities(): Array<{ value: string; label: string }> {
    return [
      { value: 'low', label: '低' },
      { value: 'medium', label: '中' },
      { value: 'high', label: '高' },
      { value: 'critical', label: '紧急' },
    ];
  }

  // 获取任务类型显示名称
  getMissionTypeDisplayName(type: string): string {
    const typeMap: Record<string, string> = {
      'combat': '作战任务',
      'training': '训练任务',
      'patrol': '巡逻任务',
      'security': '安保任务',
      'rescue': '救援任务',
      'logistics': '后勤任务',
      'intelligence': '情报任务',
      'other': '其他任务',
    };
    return typeMap[type] || type;
  }

  // 获取任务状态显示名称
  getMissionStatusDisplayName(status: string): string {
    const statusMap: Record<string, string> = {
      'draft': '草稿',
      'planned': '已计划',
      'approved': '已批准',
      'in_progress': '进行中',
      'completed': '已完成',
      'cancelled': '已取消',
      'delayed': '延迟',
    };
    return statusMap[status] || status;
  }

  // 获取任务优先级显示名称
  getMissionPriorityDisplayName(priority: string): string {
    const priorityMap: Record<string, string> = {
      'low': '低',
      'medium': '中',
      'high': '高',
      'critical': '紧急',
    };
    return priorityMap[priority] || priority;
  }

  // 获取任务状态颜色
  getMissionStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'draft': 'default',
      'planned': 'blue',
      'approved': 'cyan',
      'in_progress': 'orange',
      'completed': 'green',
      'cancelled': 'red',
      'delayed': 'yellow',
    };
    return colorMap[status] || 'default';
  }

  // 获取任务优先级颜色
  getMissionPriorityColor(priority: string): string {
    const colorMap: Record<string, string> = {
      'low': 'blue',
      'medium': 'green',
      'high': 'orange',
      'critical': 'red',
    };
    return colorMap[priority] || 'default';
  }
}

export default new MissionsServiceSimple();
