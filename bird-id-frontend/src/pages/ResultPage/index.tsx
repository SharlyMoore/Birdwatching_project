import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Descriptions, Button, Space, Result, message } from 'antd';
import { FolderAddOutlined, ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons';
import { addObservation } from '../../shared/api/mockData';

const { Title, Text, Paragraph } = Typography;

export const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <Result
        status="warning"
        title="Нет данных для отображения"
        subTitle="Пожалуйста, сначала загрузите фотографию для распознавания."
        extra={<Button type="primary" onClick={() => navigate('/recognize')}>Перейти к сканеру</Button>}
      />
    );
  }

  const handleSaveToGallery = () => {
    addObservation({
      id: `obs-${Date.now()}`,
      commonName: data.commonName,
      latinName: data.latinName,
      category: data.category,
      confidence: data.confidence,
      imageUrl: data.imageUrl,
      description: data.description,
      date: new Date().toISOString().split('T')[0],
    });

    message.success('Находка сохранена в вашу личную галерею!');
    navigate('/gallery');
  };

  return (
    <div style={{ maxWidth: 800, margin: '30px auto', padding: '0 16px' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/recognize')} style={{ marginBottom: 16 }}>
        Назад к сканеру
      </Button>

      <Card
        bordered={false}
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12, overflow: 'hidden' }}
        cover={
          <div style={{ textAlign: 'center', background: '#000', maxHeight: 380, display: 'flex', justifyContent: 'center' }}>
            <img alt={data.commonName} src={data.imageUrl} style={{ maxHeight: 380, width: 'auto', objectFit: 'contain' }} />
          </div>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Space>
            <CheckCircleFilled style={{ color: '#52c41a', fontSize: 24 }} />
            <Title level={2} style={{ margin: 0 }}>{data.commonName}</Title>
          </Space>
          <Tag color="geekblue" style={{ fontSize: 14, padding: '4px 10px' }}>{data.category}</Tag>
        </div>

        <Descriptions bordered column={{ xs: 1, sm: 2 }} size="middle" style={{ marginBottom: 20 }}>
          <Descriptions.Item label="Латинское имя">
            <Text italic>{data.latinName}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Точность нейросети">
            <Tag color={data.confidence > 0.8 ? 'green' : 'orange'}>
              {(data.confidence * 100).toFixed(1)}%
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Описание" span={2}>
            <Paragraph style={{ margin: 0 }}>{data.description}</Paragraph>
          </Descriptions.Item>
        </Descriptions>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button size="large" onClick={() => navigate('/recognize')}>
            Распознать другое фото
          </Button>
          <Button type="primary" size="large" icon={<FolderAddOutlined />} onClick={handleSaveToGallery}>
            Выгрузить в галерею
          </Button>
        </div>
      </Card>
    </div>
  );
};