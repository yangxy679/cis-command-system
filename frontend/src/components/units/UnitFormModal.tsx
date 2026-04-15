import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Row, Col, Switch, Tag } from 'antd';
import { DeploymentUnitOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import unitsService, { Unit, CreateUnitData, UpdateUnitData } from '../../services/units.service';

const { TextArea } = Input;
const { Option } = Select;

interface UnitFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  unit: Unit | null;
  editMode: boolean;
}

const UnitFormModal: React.FC<UnitFormModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  unit,
  editMode,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [newCapability, setNewCapability] = useState('');

  // 初始化表单数据
  useEffect(() => {
    if (unit && editMode) {
      form.setFieldsValue({
        name: unit.name,
        code: unit.code,
        type: unit.type,
        level: unit.level,
        description: unit.description,
        location: unit.location,
        commander: unit.commander,
        commanderRank: unit.commanderRank,
        commanderContact: unit.commanderContact,
        isActive: unit.isActive,
      });
      setCapabilities(unit.capabilities || []);
    } else {
      form.resetFields();
      setCapabilities([]);
    }
  }, [unit, editMode, form, visible]);

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const unitData = {
        ...values,
        capabilities,
      };

      if (editMode && unit) {
        await unitsService.updateUnit(unit.id, unitData as UpdateUnitData);
        message.success('单位更新成功');
      } else {
        await unitsService.createUnit(unitData as CreateUnitData);
        message.success('单位创建成功');
      }

      onSuccess();
    } catch (error: any) {
      console.error('保存单位失败:', error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.errorFields) {
        message.error('请检查表单填写是否正确');
      } else {
        message.error('保存单位失败');
      }
    } finally {
      setLoading(false);
    }
  };

  // 添加能力
  const handleAddCapability = () => {
    if (newCapability.trim() && !capabilities.includes(newCapability.trim())) {
      setCapabilities([...capabilities, newCapability.trim()]);
      setNewCapability('');
    }
  };

  // 删除能力
  const handleRemoveCapability = (capability: string) => {
    setCapabilities(capabilities.filter(c => c !== capability));
  };

  // 处理回车键添加能力
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCapability();
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center">
          <DeploymentUnitOutlined className="mr-2" />
          {editMode ? '编辑作战单位' : '新建作战单位'}
        </div>
      }
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="cancel" icon={<CloseOutlined />} onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveOutlined />}
          loading={loading}
          onClick={handleSubmit}
        >
          {editMode ? '更新单位' : '创建单位'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="单位名称"
              rules={[
                { required: true, message: '请输入单位名称' },
                { max: 50, message: '单位名称不能超过50个字符' },
              ]}
            >
              <Input placeholder="例如：第一装甲营" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="code"
              label="单位代码"
              rules={[
                { required: true, message: '请输入单位代码' },
                { pattern: /^[A-Z0-9_-]+$/, message: '只能包含大写字母、数字、下划线和连字符' },
                { max: 20, message: '单位代码不能超过20个字符' },
              ]}
            >
              <Input placeholder="例如：1ST_ARMOR_BATTALION" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="单位类型"
              rules={[{ required: true, message: '请选择单位类型' }]}
            >
              <Select placeholder="选择单位类型">
                {unitsService.getUnitTypes().map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="level"
              label="单位级别"
              rules={[{ required: true, message: '请选择单位级别' }]}
            >
              <Select placeholder="选择单位级别">
                {unitsService.getUnitLevels().map(level => (
                  <Option key={level.value} value={level.value}>
                    {level.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="单位描述"
          rules={[{ max: 500, message: '描述不能超过500个字符' }]}
        >
          <TextArea
            rows={3}
            placeholder="请输入单位描述，包括主要任务、特点等"
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="所在地点"
          rules={[{ max: 100, message: '地点不能超过100个字符' }]}
        >
          <Input placeholder="例如：北京军区第38集团军驻地" />
        </Form.Item>

        <div className="mb-4">
          <div className="font-medium mb-2">单位能力</div>
          <div className="flex items-center mb-2">
            <Input
              value={newCapability}
              onChange={(e) => setNewCapability(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入能力并按回车添加"
              style={{ width: 300 }}
            />
            <Button type="link" onClick={handleAddCapability} className="ml-2">
              添加
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {capabilities.map(capability => (
              <Tag
                key={capability}
                closable
                onClose={() => handleRemoveCapability(capability)}
                color="blue"
              >
                {capability}
              </Tag>
            ))}
            {capabilities.length === 0 && (
              <span className="text-gray-400">暂无能力，请添加</span>
            )}
          </div>
        </div>

        <div className="text-lg font-medium mb-4">指挥员信息</div>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="commander"
              label="指挥员姓名"
              rules={[{ max: 50, message: '姓名不能超过50个字符' }]}
            >
              <Input placeholder="例如：张建国" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="commanderRank"
              label="军衔"
              rules={[{ max: 20, message: '军衔不能超过20个字符' }]}
            >
              <Input placeholder="例如：上校" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="commanderContact"
              label="联系方式"
              rules={[
                { max: 100, message: '联系方式不能超过100个字符' },
                { pattern: /^[0-9-+()\s]*$/, message: '请输入有效的联系方式' },
              ]}
            >
              <Input placeholder="例如：13800138000" />
            </Form.Item>
          </Col>
        </Row>

        {editMode && (
          <Form.Item
            name="isActive"
            label="单位状态"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UnitFormModal;
