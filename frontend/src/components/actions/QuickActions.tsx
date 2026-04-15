import React from 'react';
import { Button, Space, Card } from 'antd';
import { 
  PlusOutlined, 
  ExportOutlined, 
  SettingOutlined,
  TeamOutlined,
  FileSearchOutlined,
  BellOutlined,
  DashboardOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';

const QuickActions: React.FC = () => {
  const actions = [
    {
      key: 'create-mission',
      icon: <PlusOutlined />,
      text: '创建任务',
      description: '创建新的作战任务',
      color: '#1890ff',
    },
    {
      key: 'manage-units',
      icon: <TeamOutlined />,
      text: '管理单位',
      description: '管理作战单位',
      color: '#52c41a',
    },
    {
      key: 'export-report',
      icon: <ExportOutlined />,
      text: '导出报告',
      description: '导出作战数据报告',
      color: '#722ed1',
    },
    {
      key: 'system-settings',
      icon: <SettingOutlined />,
      text: '系统设置',
      description: '系统配置和管理',
      color: '#fa8c16',
    },
    {
      key: 'view-logs',
      icon: <FileSearchOutlined />,
      text: '查看日志',
      description: '查看系统操作日志',
      color: '#13c2c2',
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      text: '通知管理',
      description: '管理系统通知',
      color: '#f5222d',
    },
    {
      key: 'dashboard-custom',
      icon: <DashboardOutlined />,
      text: '仪表板定制',
      description: '自定义仪表板布局',
      color: '#eb2f96',
    },
    {
      key: 'security-scan',
      icon: <SecurityScanOutlined />,
      text: '安全扫描',
      description: '执行系统安全扫描',
      color: '#fa541c',
    },
  ];

  const handleActionClick = (actionKey: string) => {
    console.log(`执行动作: ${actionKey}`);
    // 这里可以添加实际的动作处理逻辑
    alert(`即将执行: ${actions.find(a => a.key === actionKey)?.text}`);
  };

  return (
    <div className="quick-actions">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Card
            key={action.key}
            hoverable
            className="text-center"
            onClick={() => handleActionClick(action.key)}
            bodyStyle={{ padding: '12px' }}
          >
            <div className="flex flex-col items-center">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <div style={{ color: action.color, fontSize: '18px' }}>
                  {action.icon}
                </div>
              </div>
              <div className="font-medium">{action.text}</div>
              <div className="text-xs text-gray-500 mt-1">{action.description}</div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="text-sm font-medium mb-2">常用功能</div>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />}>
            快速创建
          </Button>
          <Button icon={<ExportOutlined />}>
            数据导出
          </Button>
          <Button icon={<SettingOutlined />}>
            系统设置
          </Button>
          <Button icon={<TeamOutlined />}>
            人员管理
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default QuickActions;
