import React from 'react';
import { Modal, Descriptions, Tag, Card } from 'antd';
import { DeploymentUnitOutlined, TeamOutlined } from '@ant-design/icons';
import { Unit } from '../../services/units.service';

interface UnitDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  unit: Unit | null;
}

const UnitDetailModal: React.FC<UnitDetailModalProps> = ({
  visible,
  onCancel,
  unit,
}) => {
  if (!unit) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN');
  };

  return (
    <Modal
      title="作战单位详情"
      open={visible}
      onCancel={onCancel}
      width={600}
      footer={null}
    >
      <Card>
        <Descriptions column={1} size="small">
          <Descriptions.Item label="单位名称">
            <div className="flex items-center">
              <DeploymentUnitOutlined className="mr-2" />
              {unit.name}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="单位代码">
            {unit.code}
          </Descriptions.Item>
          <Descriptions.Item label="单位类型">
            <Tag color="blue">
              {unit.type === 'infantry' ? '步兵' : 
               unit.type === 'armor' ? '装甲' :
               unit.type === 'artillery' ? '炮兵' :
               unit.type === 'engineer' ? '工兵' :
               unit.type === 'signal' ? '通信' :
               unit.type === 'medical' ? '医疗' :
               unit.type === 'logistics' ? '后勤' :
               unit.type === 'special_forces' ? '特种部队' :
               unit.type === 'aviation' ? '航空兵' :
               unit.type === 'navy' ? '海军' : unit.type}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="单位状态">
            <Tag color={
              unit.status === 'standby' ? 'blue' :
              unit.status === 'deployed' ? 'green' :
              unit.status === 'training' ? 'orange' :
              unit.status === 'maintenance' ? 'yellow' :
              unit.status === 'combat' ? 'red' : 'gray'
            }>
              {unit.status === 'standby' ? '待命' : 
               unit.status === 'deployed' ? '已部署' :
               unit.status === 'training' ? '训练中' :
               unit.status === 'maintenance' ? '维护中' :
               unit.status === 'combat' ? '作战中' : '禁用'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="人员数量">
            <div className="flex items-center">
              <TeamOutlined className="mr-2" />
              {unit.personnelCount}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="装备数量">
            <div className="flex items-center">
              <DeploymentUnitOutlined className="mr-2" />
              {unit.equipmentCount}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="单位描述">
            {unit.description || '暂无描述'}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {formatDate(unit.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Modal>
  );
};

export default UnitDetailModal;
