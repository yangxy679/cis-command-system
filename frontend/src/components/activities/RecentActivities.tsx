import React from 'react';
import { List, Tag, Avatar } from 'antd';
import { 
  UserOutlined, 
  SafetyOutlined, 
  DeploymentUnitOutlined,
  FileTextOutlined,
  BellOutlined 
} from '@ant-design/icons';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  user: string;
}

interface RecentActivitiesProps {
  activities?: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const defaultActivities: Activity[] = [
    {
      id: '1',
      type: 'user_login',
      description: '用户登录系统',
      timestamp: new Date(Date.now() - 5 * 60000),
      user: '指挥员张三',
    },
    {
      id: '2',
      type: 'mission_created',
      description: '创建新的作战任务',
      timestamp: new Date(Date.now() - 15 * 60000),
      user: '作战指挥官李四',
    },
    {
      id: '3',
      type: 'system_alert',
      description: '系统性能优化完成',
      timestamp: new Date(Date.now() - 30 * 60000),
      user: '系统管理员',
    },
    {
      id: '4',
      type: 'data_export',
      description: '导出作战数据报告',
      timestamp: new Date(Date.now() - 45 * 60000),
      user: '数据分析师王五',
    },
    {
      id: '5',
      type: 'unit_deployed',
      description: '作战单位部署完成',
      timestamp: new Date(Date.now() - 60 * 60000),
      user: '部署工程师赵六',
    },
  ];

  const displayActivities = activities && activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_login':
        return <UserOutlined style={{ color: '#1890ff' }} />;
      case 'mission_created':
        return <DeploymentUnitOutlined style={{ color: '#722ed1' }} />;
      case 'system_alert':
        return <BellOutlined style={{ color: '#fa8c16' }} />;
      case 'data_export':
        return <FileTextOutlined style={{ color: '#52c41a' }} />;
      case 'unit_deployed':
        return <SafetyOutlined style={{ color: '#f5222d' }} />;
      default:
        return <UserOutlined />;
    }
  };

  const getActivityTag = (type: string) => {
    switch (type) {
      case 'user_login':
        return <Tag color="blue">登录</Tag>;
      case 'mission_created':
        return <Tag color="purple">任务</Tag>;
      case 'system_alert':
        return <Tag color="orange">系统</Tag>;
      case 'data_export':
        return <Tag color="green">数据</Tag>;
      case 'unit_deployed':
        return <Tag color="red">部署</Tag>;
      default:
        return <Tag>其他</Tag>;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}小时前`;
    return `${Math.floor(diffMins / 1440)}天前`;
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={displayActivities}
      renderItem={(activity) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                icon={getActivityIcon(activity.type)}
                style={{ backgroundColor: 'transparent' }}
              />
            }
            title={
              <div className="flex items-center justify-between">
                <span>{activity.description}</span>
                {getActivityTag(activity.type)}
              </div>
            }
            description={
              <div className="flex justify-between text-gray-500">
                <span>
                  <UserOutlined className="mr-1" />
                  {activity.user}
                </span>
                <span>{formatTime(activity.timestamp)}</span>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default RecentActivities;
