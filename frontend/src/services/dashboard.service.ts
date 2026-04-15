import axios from 'axios';
import { authHeader } from './auth.service';

const API_URL = 'http://localhost:3000/api';

export interface DashboardStats {
  onlineUsers: number;
  combatUnits: number;
  activeMissions: number;
  systemHealth: number;
  cpuUsage: number;
  memoryUsage: number;
  networkTraffic: number;
  storageUsage: number;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: Date;
    user: string;
  }>;
  alerts: Array<{
    id: string;
    level: 'info' | 'warning' | 'error' | 'critical';
    title: string;
    description: string;
    timestamp: Date;
  }>;
  performanceMetrics: Array<{
    time: string;
    cpu: number;
    memory: number;
    network: number;
    activeUsers: number;
  }>;
}

export interface RealTimeMetrics {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
  activeSessions: number;
  responseTime: number;
}

export interface SystemHealth {
  status: string;
  timestamp: string;
  services: {
    database: { status: string; responseTime: number };
    cache: { status: string; responseTime: number };
    auth: { status: string; responseTime: number };
    api: { status: string; responseTime: number };
  };
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
}

class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await axios.get(`${API_URL}/dashboard/stats`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async getRealTimeMetrics(): Promise<RealTimeMetrics> {
    const response = await axios.get(`${API_URL}/dashboard/metrics/realtime`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async getSystemHealth(): Promise<SystemHealth> {
    const response = await axios.get(`${API_URL}/dashboard/health`, {
      headers: authHeader(),
    });
    return response.data;
  }

  // 订阅实时数据更新
  subscribeToRealTimeUpdates(callback: (data: RealTimeMetrics) => void) {
    const eventSource = new EventSource(`${API_URL}/dashboard/metrics/stream`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };

    eventSource.onerror = (error) => {
      console.error('Real-time metrics stream error:', error);
      eventSource.close();
    };

    return () => eventSource.close();
  }
}

export default new DashboardService();
