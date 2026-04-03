import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, Row, Col, Statistic, Alert } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  DeploymentUnitOutlined, 
  SafetyCertificateOutlined,
  LineChartOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import RealTimeMonitor from '../monitor/RealTimeMonitor';
import RecentActivities from '../activities/RecentActivities';
import QuickActions from '../actions/QuickActions';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">作战指挥中心</h1>
        <p className="text-gray-600">欢迎回来，{user?.fullName || user?.username} {user?.rank}</p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="在线人员"
              value={42}
              prefix={<UserOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="作战单位"
              value={8}
              prefix={<TeamOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="部署任务"
              value={15}
              prefix={<DeploymentUnitOutlined />}
              suffix="项"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="系统状态"
              value={100}
              prefix={<SafetyCertificateOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* 实时监控 */}
      <div className="mb-6">
        <Card title="实时作战监控" extra={<LineChartOutlined />}>
          <RealTimeMonitor />
        </Card>
      </div>

      {/* 两列布局 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="最近活动" extra={<ClockCircleOutlined />}>
            <RecentActivities />
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
        message="系统运行正常"
        description="所有服务正常运行，无异常告警。"
        type="success"
        showIcon
      />
    </div>
  );
};

export default DashboardPage;
