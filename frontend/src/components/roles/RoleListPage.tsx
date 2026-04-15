// 角色列表页面 - 简化版本
import React from 'react';
import { Card, Button, message } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';

const RoleListPage: React.FC = () => {
  return (
    <Card>
      <div className="text-center py-8">
        <SafetyOutlined className="text-4xl text-blue-600 mb-4" />
        <h2 className="text-xl font-bold mb-2">角色管理</h2>
        <p className="text-gray-600 mb-6">角色管理功能开发中...</p>
        <Button type="primary" onClick={() => message.info('角色管理功能即将上线')}>
          查看详情
        </Button>
      </div>
    </Card>
  );
};

export default RoleListPage;
