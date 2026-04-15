import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Card, message, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import missionsService, { Mission } from '../../services/missions.service.simple';
import MissionFormModal from './MissionFormModal';

const { Search } = Input;

const MissionListPage: React.FC = () => {
  const navigate = useNavigate();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [editMode, setEditMode] = useState(false);

  // 加载任务数据
  const loadMissions = async () => {
    try {
      setLoading(true);
      const response = await missionsService.getMissions();
      setMissions(response.data || []);
    } catch (error) {
      console.error('加载任务列表失败:', error);
      message.error('加载任务列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMissions();
  }, []);

  // 表格列定义
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Mission) => (
        <div className="flex items-center">
          <RocketOutlined className="mr-2 text-gray-400" />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.code}</div>
          </div>
        </div>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="blue">{missionsService.getMissionTypeDisplayName(type)}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={missionsService.getMissionStatusColor(status)}>
          {missionsService.getMissionStatusDisplayName(status)}
        </Tag>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={missionsService.getMissionPriorityColor(priority)}>
          {missionsService.getMissionPriorityDisplayName(priority)}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Mission) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 处理编辑
  const handleEdit = (mission: Mission) => {
    setSelectedMission(mission);
    setEditMode(true);
    setIsFormModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (mission: Mission) => {
    try {
      await missionsService.deleteMission(mission.id);
      message.success('任务删除成功');
      loadMissions();
    } catch (error: any) {
      console.error('删除任务失败:', error);
      message.error('删除任务失败');
    }
  };

  // 处理创建任务
  const handleCreateMission = () => {
    setSelectedMission(null);
    setEditMode(false);
    setIsFormModalVisible(true);
  };

  // 处理表单提交成功
  const handleFormSuccess = () => {
    setIsFormModalVisible(false);
    loadMissions();
  };

  return (
    <div className="mission-list-page">
      <Card>
        {/* 工具栏 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <Search
              placeholder="搜索任务名称"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="max-w-md"
            />
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateMission}
          >
            新建任务
          </Button>
        </div>

        {/* 任务表格 */}
        <Table
          columns={columns}
          dataSource={missions}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 任务表单模态框 */}
      <MissionFormModal
        visible={isFormModalVisible}
        onCancel={() => setIsFormModalVisible(false)}
        onSuccess={handleFormSuccess}
        mission={selectedMission}
        editMode={editMode}
      />
    </div>
  );
};

export default MissionListPage;
