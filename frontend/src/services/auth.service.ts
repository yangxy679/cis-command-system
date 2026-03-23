import axios from 'axios';
import { 
  LoginCredentials, 
  RegisterData, 
  User, 
  AuthResponse,
  TokenResponse 
} from '../types/auth.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理token刷新
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 如果是401错误且不是刷新token的请求
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 尝试刷新token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('没有刷新令牌');
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // 保存新的token
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // 重试原始请求
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 刷新失败，清除token并跳转到登录页
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const authService = {
  // 用户注册
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // 用户登录
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // 获取用户信息
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // 更新用户信息
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.post('/auth/profile', data);
    return response.data;
  },

  // 修改密码
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', {
      oldPassword,
      newPassword,
      confirmPassword: newPassword,
    });
  },

  // 刷新token
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  // 用户登出
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  // 验证token
  async validateToken(): Promise<{ valid: boolean; user: any }> {
    const response = await api.get('/auth/validate');
    return response.data;
  },

  // 健康检查
  async healthCheck(): Promise<{ status: string }> {
    const response = await api.get('/auth/health');
    return response.data;
  },
};

export default authService;