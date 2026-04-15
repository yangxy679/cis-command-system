import axios from 'axios';
import { authHeader } from './auth.service';

const API_URL = 'http://localhost:3000/api';

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  isSystem: boolean;
  priority?: number;
  users?: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface RolesResponse {
  data: Role[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface RoleStatistics {
  total: number;
  active: number;
  system: number;
  custom: number;
}

export interface PermissionsData {
  permissions: string[];
  groups: Record<string, string[]>;
  rolePermissions: Record<string, string[]>;
}

export interface CreateRoleData {
  name: string;
  description?: string;
  permissions: string[];
  isActive?: boolean;
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
  priority?: number;
}

class RolesService {
  async getRoles(params: RoleQueryParams = {}): Promise<RolesResponse> {
    const response = await axios.get(`${API_URL}/roles`, {
      params,
      headers: authHeader(),
    });
    return response.data;
  }

  async getRoleStatistics(): Promise<RoleStatistics> {
    const response = await axios.get(`${API_URL}/roles/statistics`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async getAllPermissions(): Promise<PermissionsData> {
    const response = await axios.get(`${API_URL}/roles/permissions`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async initializeSystemRoles(): Promise<{ message: string }> {
    const response = await axios.get(`${API_URL}/roles/initialize-system`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async getRoleById(id: string): Promise<Role> {
    const response = await axios.get(`${API_URL}/roles/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async createRole(roleData: CreateRoleData): Promise<Role> {
    const response = await axios.post(`${API_URL}/roles`, roleData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async updateRole(id: string, roleData: UpdateRoleData): Promise<Role> {
    const response = await axios.put(`${API_URL}/roles/${id}`, roleData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async addRolePermission(id: string, permission: string): Promise<Role> {
    const response = await axios.put(`${API_URL}/roles/${id}/permissions/add`, 
      { permission },
      { headers: authHeader() }
    );
    return response.data;
  }

  async removeRolePermission(id: string, permission: string): Promise<Role> {
    const response = await axios.put(`${API_URL}/roles/${id}/permissions/remove`, 
      { permission },
      { headers: authHeader() }
    );
    return response.data;
  }

  async deleteRole(id: string): Promise<void> {
    await axios.delete(`${API_URL}/roles/${id}`, {
      headers: authHeader(),
    });
  }

  async checkRolePermission(id: string, permission: string): Promise<{ hasPermission: boolean }> {
    const response = await axios.get(`${API_URL}/roles/${id}/has-permission/${permission}`, {
      headers: authHeader(),
    });
    return response.data;
  }

  // 获取权限分组
  getPermissionGroups(permissionsData: PermissionsData) {
    return permissionsData.groups;
  }

  // 获取预定义角色权限
  getRolePermissions(permissionsData: PermissionsData) {
    return permissionsData.rolePermissions;
  }

  // 检查角色是否有特定权限
  hasPermission(role: Role, permission: string): boolean {
    return role.permissions?.includes(permission) || false;
  }

  // 获取角色的权限描述
  getRolePermissionDescriptions(role: Role, permissionsData: PermissionsData): string[] {
    if (!role.permissions) return [];
    
    return role.permissions.map(permission => {
      // 这里可以添加权限描述映射
      const permissionDescriptions: Record<string, string> = {
        'user:view': '查看用户',
        'user:create': '创建用户',
        'user:edit': '编辑用户',
        'user:delete': '删除用户',
        'user:manage_roles': '管理用户角色',
        'role:view': '查看角色',
        'role:create': '创建角色',
        'role:edit': '编辑角色',
        'role:delete': '删除角色',
        'role:manage_permissions': '管理角色权限',
        'dashboard:view': '查看仪表板',
        'dashboard:manage': '管理仪表板',
        'unit:view': '查看作战单位',
        'unit:create': '创建作战单位',
        'unit:edit': '编辑作战单位',
        'unit:delete': '删除作战单位',
        'unit:deploy': '部署作战单位',
        'mission:view': '查看任务',
        'mission:create': '创建任务',
        'mission:edit': '编辑任务',
        'mission:delete': '删除任务',
        'mission:assign': '分配任务',
        'report:view': '查看报表',
        'report:create': '创建报表',
        'report:export': '导出报表',
        'system:settings_view': '查看系统设置',
        'system:settings_edit': '编辑系统设置',
        'system:logs_view': '查看系统日志',
        'system:logs_manage': '管理系统日志',
        'admin:all': '所有管理员权限',
        'super_admin': '超级管理员',
      };
      
      return permissionDescriptions[permission] || permission;
    });
  }
}

export default new RolesService();
