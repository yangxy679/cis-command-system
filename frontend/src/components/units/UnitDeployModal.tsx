import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { Unit } from '../../services/units.service';

interface UnitDeployModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  unit: Unit | null;
}

const UnitDeployModal: React.FC<UnitDeployModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  unit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // 这里调用部署API
      message.success('单位部署成功（模拟）');
      onSuccess();
    } catch (error) {
      console.error('部署单位失败:', error);
      message.error('部署单位失败');
    } finally {
      setLoading(false);
    }
  };

  if (!unit) return null;

  return (
    <Modal
      title={
        <div className="flex items-center">
          <RocketOutlined className="mr-2" />
          部署作战单位：{unit.name}
        </div>
      }
      open={visible}
      onCancel={onCancel}
      width={500}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          确认部署
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="missionName"
          label="任务名称"
          rules={[{ required: true, message: '请输入任务名称' }]}
        >
          <Input placeholder="例如：边境巡逻任务" />
        </Form.Item>

        <Form.Item
          name="deploymentLocation"
          label="部署地点"
          rules={[{ required: true, message: '请输入部署地点' }]}
        >
          <Input placeholder="例如：中印边境东段" />
        </Form.Item>

        <div className="text-sm text-gray-600 mt-4">
          即将部署单位：{unit.name}（{unit.code}）
          <br />
          单位类型：{unit.type === 'infantry' ? '步兵' : 
                   unit.type === 'armor' ? '装甲' :
                   unit.type === 'artillery' ? '炮兵' :
                   unit.type === 'engineer' ? '工兵' :
                   unit.type === 'signal' ? '通信' :
                   unit.type === 'medical' ? '医疗' :
                   unit.type === 'logistics' ? '后勤' :
                   unit.type === 'special_forces' ? '特种部队' :
                   unit.type === 'aviation' ? '航空兵' :
                   unit.type === 'navy' ? '海军' : unit.type}
          <br />
          当前状态：{unit.status === 'standby' ? '待命' : 
                   unit.status === 'deployed' ? '已部署' :
                   unit.status === 'training' ? '训练中' :
                   unit.status === 'maintenance' ? '维护中' :
                   unit.status === 'combat' ? '作战中' : '禁用'}
        </div>
      </Form>
    </Modal>
  );
};

export default UnitDeployModal;
