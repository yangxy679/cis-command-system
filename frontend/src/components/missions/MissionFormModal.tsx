import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Row, Col, DatePicker, InputNumber } from 'antd';
import { RocketOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import missionsService, { Mission } from '../../services/missions.service.simple';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface MissionFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  mission: Mission | null;
  editMode: boolean;
}

const MissionFormModal: React.FC<MissionFormModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  mission,
  editMode,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 初始化表单数据
  useEffect(() => {
    if (mission && editMode) {
      form.setFieldsValue({
        name: mission.name,
        code: mission.code,
        description: mission.description,
        type: mission.type,
        priority: mission.priority,
        plannedStartDate: dayjs(mission.plannedStartDate),
        plannedEndDate: dayjs(mission.plannedEndDate),
        location: mission.location,
        estimatedCost: mission.estimatedCost,
        estimatedPersonnel: mission.estimatedPersonnel,
      });
    } else {
      form.resetFields();
    }
  }, [mission, editMode, form, visible]);

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const missionData = {
        ...values,
        plannedStartDate: values.plannedStartDate.toDate(),
        plannedEndDate: values.plannedEndDate.toDate(),
      };

      if (editMode && mission) {
        await missionsService.updateMission(mission.id, missionData);
        message.success('任务更新成功');
      } else {
        await missionsService.createMission(missionData);
        message.success('任务创建成功');
      }

      onSuccess();
    } catch (error: any) {
      console.error('保存任务失败:', error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.errorFields) {
        message.error('请检查表单填写是否正确');
      } else {
        message.error('保存任务失败');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center">
          <RocketOutlined className="mr-2" />
          {editMode ? '编辑任务' : '新建任务'}
        </div>
      }
      open={visible}
      onCancel={onCancel}
      width={700}
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
          {editMode ? '更新任务' : '创建任务'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="任务名称"
              rules={[
                { required: true, message: '请输入任务名称' },
                { max: 100, message: '任务名称不能超过100个字符' },
              ]}
            >
              <Input placeholder="例如：边境巡逻任务" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="code"
              label="任务代码"
              rules={[
                { required: true, message: '请输入任务代码' },
                { pattern: /^[A-Z0-9_-]+$/, message: '只能包含大写字母、数字、下划线和连字符' },
                { max: 50, message: '任务代码不能超过50个字符' },
              ]}
            >
              <Input placeholder="例如：BORDER_PATROL_001" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="任务描述"
          rules={[{ max: 500, message: '描述不能超过500个字符' }]}
        >
          <TextArea
            rows={3}
            placeholder="请输入任务描述，包括任务目标、背景等"
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="任务类型"
              rules={[{ required: true, message: '请选择任务类型' }]}
            >
              <Select placeholder="选择任务类型">
                {missionsService.getMissionTypes().map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priority"
              label="任务优先级"
              rules={[{ required: true, message: '请选择任务优先级' }]}
            >
              <Select placeholder="选择任务优先级">
                {missionsService.getMissionPriorities().map(priority => (
                  <Option key={priority.value} value={priority.value}>
                    {priority.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="plannedStartDate"
              label="计划开始时间"
              rules={[{ required: true, message: '请选择计划开始时间' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                placeholder="选择开始时间"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="plannedEndDate"
              label="计划结束时间"
              rules={[{ required: true, message: '请选择计划结束时间' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                placeholder="选择结束时间"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="location"
          label="任务地点"
          rules={[
            { required: true, message: '请输入任务地点' },
            { max: 200, message: '地点不能超过200个字符' },
          ]}
        >
          <Input placeholder="例如：中印边境东段" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="estimatedPersonnel"
              label="预计人员数量"
              rules={[
                { required: true, message: '请输入预计人员数量' },
                { type: 'number', min: 1, message: '人员数量必须大于0' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="例如：50"
                min={1}
                max={10000}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="estimatedCost"
              label="预计成本（元）"
              rules={[
                { required: true, message: '请输入预计成本' },
                { type: 'number', min: 0, message: '成本不能为负数' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="例如：500000"
                min={0}
                max={1000000000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MissionFormModal;
