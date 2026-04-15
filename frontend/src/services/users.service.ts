import axios from 'axios';
import { authHeader } from './auth.service';

const API_URL = 'http://localhost:3000/api';

export interface User {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
  rank?: string;
  department?: string;
  position?: string;
  phone?: string;
  isActive: boolean;
  isVerified: boolean;
  lastLoginAt?: Date;
  loginCount: number;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  isSystem: boolean;
  priority?: number;
}

export interface UserQueryParams {
  search?: string;
  department?: string;
  isActive?: boolean;
  roleId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface UsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserStatistics {
  total: number;
  active: number;
  verified: number;
  inactive: number;
  departmentStats: Array<{
    department: string;
    count: string;
  }>;
  recentRegistrations: number;
}

export interface CreateUserData {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
  rank?: string;
  department?: string;
  position?: string;
  phone?: string;
  roleIds?: string[];
}

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  rank?: string;
  department?: string;
  position?: string;
  phone?: string;
  isActive?: boolean;
  preferences?: Record<string, any>;
  roleIds?: string[];
}

export interface UpdateProfileData {
  fullName?: string;
  email?: string;
  phone?: string;
  preferences?: Record<string, any>;
}

export interface ChangeStatusData {
  isActive: boolean;
  reason?: string;
}

export interface AssignRolesData {
  roleIds: string[];
}

class UsersService {
  async getUsers(params: UserQueryParams = {}): Promise<UsersResponse> {
    const response = await axios.get(`${API_URL}/users`, {
      params,
      headers: authHeader(),
    });
    return response.data;
  }

  async getUserStatistics(): Promise<UserStatistics> {
    const response = await axios.get(`${API_URL}/users/statistics`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async searchUsers(keyword: string, limit: number = 10): Promise<User[]> {
    const response = await axios.get(`${API_URL}/users/search`, {
      params: { keyword, limit },
      headers: authHeader(),
    });
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async createUser(userData: CreateUserData): Promise<User> {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    const response = await axios.put(`${API_URL}/users/${id}`, userData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async updateProfile(id: string, profileData: UpdateProfileData): Promise<User> {
    const response = await axios.put(`${API_URL}/users/${id}/profile`, profileData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async changeUserStatus(id: string, statusData: ChangeStatusData): Promise<User> {
    const response = await axios.put(`${API_URL}/users/${id}/status`, statusData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async assignUserRoles(id: string, rolesData: AssignRolesData): Promise<User> {
    const response = await axios.put(`${API_URL}/users/${id}/roles`, rolesData, {
      headers: authHeader(),
    });
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${API_URL}/users/${id}`, {
      headers: authHeader(),
    });
  }

  async getCurrentUserProfile(): Promise<User> {
    // 这里需要从JWT token中获取当前用户ID
    // 暂时使用本地存储的用户ID
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('用户未登录');
    
    const user = JSON.parse(userStr);
    return this.getUserById(user.id);
  }

  // 导出用户数据
  async exportUsers(format: 'csv' | 'excel' | 'pdf' = 'csv'): Promise<Blob> {
    const response = await axios.get(`${API_URL}/users/export`, {
      params: { format },
      headers: authHeader(),
      responseType: 'blob',
    });
    return response.data;
  }

  // 批量操作用户
  async batchUpdateUsers(userIds: string[], updates: Partial<UpdateUserData>): Promise<void> {
    await axios.post(`${API_URL}/users/batch-update`, {
      userIds,
      updates,
    }, {
      headers: authHeader(),
    });
  }

  // 导入用户数据
  async importUsers(file: File): Promise<{ success: number; failed: number; errors: string[] }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/users/import`, formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default new UsersService();
