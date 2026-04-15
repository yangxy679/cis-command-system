import React from 'react';
import { Modal, Descriptions, Tag, Card } from 'antd';
import { RocketOutlined, ClockCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { Mission } from '../../services/missions.service.simple';

interface MissionDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  mission: Mission | null;
}

const MissionDetailModal: React.FC<MissionDetailModalProps> = ({
  visible,
  onCancel,
  mission,
}) => {
  if (!mission) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN');
  };

  return (
    <Modal
      title="任务详情"
      open={visible}
      onCancel={onCancel}
      width={600}
      footer={null}
    >
      <Card>
        <Descriptions column={1} size="small">
          <Descriptions.Item label="任务名称">
            <div className="flex items-center">
              <RocketOutlined className="mr-2" />
              {mission.name}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="任务代码">
            {mission.code}
          </Descriptions.Item>
          <Descriptions.Item label="任务类型">
            <Tag color="blue">
              {missionsService.getMissionTypeDisplayName(mission.type)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="任务状态">
            <Tag color={missionsService.getMissionStatusColor(mission.status)}>
              {missionsService.getMissionStatusDisplayName(mission.status)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="任务优先级">
            <Tag color={missionsService.getMissionPriorityColor(mission.priority)}>
              {missionsService.getMissionPriorityDisplayName(mission.priority)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="任务描述">
            {mission.description || '暂无描述'}
          </Descriptions.Item>
          <Descriptions.Item label="计划开始时间">
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2" />
              {formatDate(mission.plannedStartDate)}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="计划结束时间">
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2" />
              {formatDate(mission.plannedEndDate)}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="任务地点">
            <div className="flex items-center">
              <EnvironmentOutlined className="mr-2" />
              {mission.location}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="预计人员数量">
            <div className="flex items-center">
              <TeamOutlined className="mr-2" />
              {mission.estimatedPersonnel}人
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="预计成本">
            {(mission.estimatedCost / 10000).toFixed(1)}万元
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {formatDate(mission.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="最后更新">
            {formatDate(mission.updatedAt)}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Modal>
  );
};

export default MissionDetailModal;
