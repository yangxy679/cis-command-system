import React from 'react';
import { Modal, Descriptions, Tag, Avatar, Timeline, Card, Row, Col, Statistic } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  SafetyOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { User } from '../../services/users.service';

interface UserDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  user: User | null;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  visible,
  onCancel,
  user,
}) => {
  if (!user) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN');
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'green' : 'red';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? '活跃' : '禁用';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
  };

  return (
    <Modal
      title="用户详情"
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <div className="user-detail-modal">
        {/* 用户头像和基本信息 */}
        <Card className="mb-6">
          <Row gutter={16} align="middle">
            <Col span={6}>
              <div className="flex flex-col items-center">
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  className="mb-3"
                  style={{ backgroundColor: '#1890ff' }}
                />
                <Tag color={getStatusColor(user.isActive)} icon={getStatusIcon(user.isActive)}>
                  {getStatusText(user.isActive)}
                </Tag>
              </div>
            </Col>
            <Col span={18}>
              <div className="mb-4">
                <h2 className="text-xl font-bold">
                  {user.fullName || user.username}
                  {user.rank && (
                    <Tag color="gold" className="ml-2">
                      <CrownOutlined /> {user.rank}
                    </Tag>
                  )}
                </h2>
                <p className="text-gray-600">@{user.username}</p>
              </div>
              
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="登录次数"
                    value={user.loginCount}
                    prefix={<TeamOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="最后登录"
                    value={user.lastLoginAt ? formatDate(user.lastLoginAt) : '从未登录'}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="注册时间"
                    value={formatDate(user.createdAt)}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        {/* 详细信息 */}
        <Row gutter={16}>
          <Col span={12}>
            <Card title="基本信息" className="mb-4">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="用户名">
                  <div className="flex items-center">
                    <UserOutlined className="mr-2" />
                    {user.username}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  <div className="flex items-center">
                    <MailOutlined className="mr-2" />
                    {user.email || '未设置'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="手机号码">
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2" />
                    {user.phone || '未设置'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="部门">
                  <div className="flex items-center">
                    <TeamOutlined className="mr-2" />
                    {user.department || '未分配'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="职位">
                  {user.position || '未设置'}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱验证">
                  <Tag color={user.isVerified ? 'green' : 'orange'}>
                    {user.isVerified ? '已验证' : '未验证'}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="角色权限" className="mb-4">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">所属角色：</div>
                <div className="flex flex-wrap gap-2">
                  {user.roles && user.roles.length > 0 ? (
                    user.roles.map(role => (
                      <Tag key={role.id} color="purple" icon={<SafetyOutlined />}>
                        {role.name}
                      </Tag>
                    ))
                  ) : (
                    <Tag color="default">未分配角色</Tag>
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">权限列表：</div>
                <div className="flex flex-wrap gap-2">
                  {user.roles && user.roles.length > 0 ? (
                    user.roles.flatMap(role => 
                      role.permissions?.map(permission => (
                        <Tag key={`${role.id}-${permission}`} color="blue">
                          {permission}
                        </Tag>
                      )) || []
                    )
                  ) : (
                    <Tag color="default">无权限</Tag>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 时间线 */}
        <Card title="活动时间线">
          <Timeline>
            <Timeline.Item color="green">
              <p>用户注册</p>
              <p className="text-gray-500">{formatDate(user.createdAt)}</p>
            </Timeline.Item>
            {user.lastLoginAt && (
              <Timeline.Item color="blue">
                <p>最后登录</p>
                <p className="text-gray-500">{formatDate(user.lastLoginAt)}</p>
              </Timeline.Item>
            )}
            <Timeline.Item color="gray">
              <p>资料最后更新</p>
              <p className="text-gray-500">{formatDate(user.updatedAt)}</p>
            </Timeline.Item>
            {user.preferences?.statusChangeLog && (
              user.preferences.statusChangeLog.map((log: any, index: number) => (
                <Timeline.Item key={index} color={log.isActive ? 'green' : 'red'}>
                  <p>账号{log.isActive ? '激活' : '禁用'}</p>
                  <p className="text-gray-500">
                    {formatDate(new Date(log.timestamp))}
                    {log.reason && ` - ${log.reason}`}
                  </p>
                </Timeline.Item>
              ))
            )}
          </Timeline>
        </Card>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
