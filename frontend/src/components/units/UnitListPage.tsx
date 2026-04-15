import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Card, message, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import unitsService, { Unit } from '../../services/units.service';
import UnitFormModal from './UnitFormModal';

const { Search } = Input;

const UnitListPage: React.FC = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [editMode, setEditMode] = useState(false);

  // 加载单位数据
  const loadUnits = async () => {
    try {
      setLoading(true);
      const response = await unitsService.getUnits();
      setUnits(response.data || []);
    } catch (error) {
      console.error('加载单位列表失败:', error);
      message.error('加载单位列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUnits();
  }, []);

  // 表格列定义
  const columns = [
    {
      title: '单位名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Unit) => (
        <div className="flex items-center">
          <DeploymentUnitOutlined className="mr-2 text-gray-400" />
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
        <Tag color="blue">{unitsService.getUnitTypeDisplayName(type)}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={unitsService.getUnitStatusColor(status)}>
          {unitsService.getUnitStatusDisplayName(status)}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Unit) => (
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
  const handleEdit = (unit: Unit) => {
    setSelectedUnit(unit);
    setEditMode(true);
    setIsFormModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (unit: Unit) => {
    try {
      await unitsService.deleteUnit(unit.id);
      message.success('单位删除成功');
      loadUnits();
    } catch (error: any) {
      console.error('删除单位失败:', error);
      message.error('删除单位失败');
    }
  };

  // 处理创建单位
  const handleCreateUnit = () => {
    setSelectedUnit(null);
    setEditMode(false);
    setIsFormModalVisible(true);
  };

  // 处理表单提交成功
  const handleFormSuccess = () => {
    setIsFormModalVisible(false);
    loadUnits();
  };

  return (
    <div className="unit-list-page">
      <Card>
        {/* 工具栏 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <Search
              placeholder="搜索单位名称"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="max-w-md"
            />
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateUnit}
          >
            新建单位
          </Button>
        </div>

        {/* 单位表格 */}
        <Table
          columns={columns}
          dataSource={units}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 单位表单模态框 */}
      <UnitFormModal
        visible={isFormModalVisible}
        onCancel={() => setIsFormModalVisible(false)}
        onSuccess={handleFormSuccess}
        unit={selectedUnit}
        editMode={editMode}
      />
    </div>
  );
};

export default UnitListPage;
