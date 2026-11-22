import type { ReactNode } from 'react';
import { Card, Tag, Typography, Avatar, Space, Button, Popconfirm } from 'antd';
import { UserOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { Observation } from '../model/types';

const { Text, Paragraph } = Typography;

interface ObservationCardProps {
  observation: Observation;
  canDelete?: boolean;
  onDelete?: (id: number) => void;
  extraAction?: ReactNode;
}

export const ObservationCard = ({
  observation,
  canDelete = false,
  onDelete,
  extraAction,
}: ObservationCardProps) => {
  const formattedDate = new Date(observation.created_at).toLocaleDateString('ru-RU');
  const confidencePercent = Math.round(observation.confidence * 100);

  const actions: ReactNode[] = [];
  if (extraAction) actions.push(extraAction);
  if (canDelete && onDelete) {
    actions.push(
      <Popconfirm
        key="delete"
        title="Удалить карточку?"
        description="Запись будет удалена из галереи."
        onConfirm={() => onDelete(observation.id)}
        okText="Да"
        cancelText="Отмена"
      >
        <Button type="text" style={{ color: '#D3968C' }} icon={<DeleteOutlined />}>
          Удалить
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Card
      hoverable
      className="observation-card-fade"
      style={{ borderRadius: 12, overflow: 'hidden', borderColor: '#dcd7b5', height: '100%' }}
      cover={
        <img
          alt={observation.species.common_name}
          src={observation.image_url}
          style={{ height: 215, objectFit: 'cover' }}
        />
      }
      actions={actions.length > 0 ? actions : undefined}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <Text strong style={{ fontSize: 16, color: '#0A3323' }}>
          {observation.species.common_name}
        </Text>
        <Tag color="#105666">{observation.species.category}</Tag>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text italic style={{ color: '#5a6e4d' }}>
          {observation.species.latin_name}
        </Text>
        <Tag icon={<CheckCircleOutlined />} color="success">
          {confidencePercent}%
        </Tag>
      </div>

      <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
        {observation.notes || observation.species.description}
      </Paragraph>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 8,
          borderTop: '1px solid #ede8c4',
        }}
      >
        <Space size="small">
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#839958' }} />
          <Text style={{ fontSize: 12, color: '#0A3323' }}>{observation.author.username}</Text>
        </Space>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {formattedDate}
        </Text>
      </div>
    </Card>
  );
};