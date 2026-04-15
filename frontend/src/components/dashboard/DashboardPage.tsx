import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, Row, Col, Statistic, Alert, Spin, message } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  DeploymentUnitOutlined, 
  SafetyCertificateOutlined,
  LineChartOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  WarningOutlined
} from '@ant-design/icons';
import RealTimeMonitor from '../monitor/RealTimeMonitor';
import RecentActivities from '../activities/RecentActivities';
import QuickActions from '../actions/QuickActions';
import dashboardService, { DashboardStats } from '../../services/dashboard.service';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
    
    // 每30秒刷新一次数据
    const interval = setInterval(loadDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getDashboardStats();
      setStats(data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load dashboard stats:', err);
      setError('无法加载仪表板数据，请检查网络连接或重新登录');
      message.error('加载仪表板数据失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="加载仪表板数据..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="仪表板加载失败"
        description={error}
        type="error"
        showIcon
        action={
          <button 
            onClick={loadDashboardStats}
            className="text-blue-500 hover:text-blue-700"
          >
            重试
          </button>
        }
      />
    );
  }

  return (
    <div className="dashboard-page">
      <div className="mb-6">
        <div className="flex items-center">
          <DashboardOutlined className="text-2xl mr-3 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">作战指挥中心</h1>
            <p className="text-gray-600">
              欢迎回来，{user?.fullName || user?.username} {user?.rank} | 
              系统时间: {new Date().toLocaleString('zh-CN')}
            </p>
          </div>
        </div>
      </div>

      {/* 系统状态提醒 */}
      {stats?.alerts && stats.alerts.length > 0 && (
        <div className="mb-6">
          {stats.alerts.map(alert => (
            <Alert
              key={alert.id}
              message={alert.title}
              description={alert.description}
              type={
                alert.level === 'critical' ? 'error' :
                alert.level === 'warning' ? 'warning' :
                alert.level === 'error' ? 'error' : 'info'
              }
              showIcon
              icon={alert.level === 'warning' ? <WarningOutlined /> : undefined}
              className="mb-2"
            />
          ))}
        </div>
      )}

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="在线人员"
              value={stats?.onlineUsers || 0}
              prefix={<UserOutlined />}
              suffix="人"
              valueStyle={{ color: '#3f8600' }}
            />
            <div className="text-sm text-gray-500 mt-2">
              较昨日 +{Math.floor(Math.random() * 5)}人
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="作战单位"
              value={stats?.combatUnits || 0}
              prefix={<TeamOutlined />}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="text-sm text-gray-500 mt-2">
              全部处于待命状态
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="部署任务"
              value={stats?.activeMissions || 0}
              prefix={<DeploymentUnitOutlined />}
              suffix="项"
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="text-sm text-gray-500 mt-2">
              进行中: {Math.floor((stats?.activeMissions || 0) * 0.6)}项
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="系统状态"
              value={stats?.systemHealth || 0}
              prefix={<SafetyCertificateOutlined />}
              suffix="%"
              valueStyle={{ 
                color: (stats?.systemHealth || 0) > 90 ? '#3f8600' : 
                       (stats?.systemHealth || 0) > 70 ? '#faad14' : '#cf1322' 
              }}
            />
            <div className="text-sm text-gray-500 mt-2">
              {stats?.systemHealth && stats.systemHealth > 90 ? '运行正常' : 
               stats?.systemHealth && stats.systemHealth > 70 ? '需要注意' : '需要维护'}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 系统性能卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-sm text-gray-600">CPU使用率</div>
              <div className="text-2xl font-bold" style={{ color: '#1976D2' }}>
                {stats?.cpuUsage ? `${stats.cpuUsage.toFixed(1)}%` : '--'}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-sm text-gray-600">内存使用率</div>
              <div className="text-2xl font-bold" style={{ color: '#4CAF50' }}>
                {stats?.memoryUsage ? `${stats.memoryUsage.toFixed(1)}%` : '--'}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-sm text-gray-600">网络流量</div>
              <div className="text-2xl font-bold" style={{ color: '#FF9800' }}>
                {stats?.networkTraffic ? `${stats.networkTraffic.toFixed(1)} Mbps` : '--'}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <div className="text-center">
              <div className="text-sm text-gray-600">存储使用率</div>
              <div className="text-2xl font-bold" style={{ color: '#9C27B0' }}>
                {stats?.storageUsage ? `${stats.storageUsage.toFixed(1)}%` : '--'}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 实时监控 */}
      <div className="mb-6">
        <Card 
          title={
            <div className="flex items-center">
              <LineChartOutlined className="mr-2" />
              实时作战监控
            </div>
          } 
          extra={
            <button 
              onClick={loadDashboardStats}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              刷新数据
            </button>
          }
        >
          <RealTimeMonitor performanceMetrics={stats?.performanceMetrics} />
        </Card>
      </div>

      {/* 两列布局 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div className="flex items-center">
                <ClockCircleOutlined className="mr-2" />
                最近活动
              </div>
            }
            extra={
              <span className="text-gray-500 text-sm">
                最近1小时
              </span>
            }
          >
            <RecentActivities activities={stats?.recentActivities} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="快速操作">
            <QuickActions />
          </Card>
        </Col>
      </Row>

      {/* 系统状态提醒 */}
      <Alert
        className="mt-6"
        message={`系统运行${stats?.systemHealth && stats.systemHealth > 90 ? '正常' : '需要注意'}`}
        description={
          stats?.systemHealth && stats.systemHealth > 90 
            ? "所有服务正常运行，无异常告警。" 
            : "部分服务需要注意，请查看详细监控。"
        }
        type={stats?.systemHealth && stats.systemHealth > 90 ? "success" : "warning"}
        showIcon
      />
    </div>
  );
};

export default DashboardPage;
