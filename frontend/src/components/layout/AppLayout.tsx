import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Breadcrumb } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  SafetyOutlined,
  RocketOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // 菜单项配置
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表板',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: '用户管理',
    },
    {
      key: '/roles',
      icon: <SafetyOutlined />,
      label: '角色管理',
    },
    {
      key: '/units',
        { key: '/missions', icon: <RocketOutlined />, label: '任务管理' },
      icon: <DeploymentUnitOutlined />,
      label: '作战单位管理',
    },
  ];

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: '系统设置',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  // 处理菜单点击
  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  // 获取当前选中的菜单项
  const selectedKeys = [location.pathname];

  return (
    <Layout className="min-h-screen">
      {/* 侧边栏 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        className="shadow-lg"
      >
        <div className="h-16 flex items-center justify-center">
          <div className="flex items-center">
            <DeploymentUnitOutlined className="text-white text-2xl mr-2" />
            {!collapsed && (
              <span className="text-white text-lg font-bold">CIS指挥系统</span>
            )}
          </div>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        {/* 顶部栏 */}
        <Header className="bg-white shadow-sm px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg"
            />
            <Breadcrumb className="ml-4">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                {menuItems.find(item => item.key === location.pathname)?.label || '仪表板'}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={<BellOutlined />}
              shape="circle"
              className="text-gray-600"
            />
            <Button
              type="text"
              icon={<QuestionCircleOutlined />}
              shape="circle"
              className="text-gray-600"
            />
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center cursor-pointer">
                <Avatar 
                  size="default" 
                  icon={<UserOutlined />} 
                  className="bg-blue-500"
                />
                {!collapsed && (
                  <div className="ml-2">
                    <div className="text-sm font-medium">{user?.username || '管理员'}</div>
                    <div className="text-xs text-gray-500">{user?.role || '系统管理员'}</div>
                  </div>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 内容区域 */}
        <Content className="m-4 p-6 bg-white rounded-lg shadow-sm min-h-[calc(100vh-120px)]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
