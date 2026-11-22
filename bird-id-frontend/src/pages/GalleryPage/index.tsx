import { useState, useEffect } from 'react';
import { Input, Select, Row, Col, Typography, Button, Empty, message, Tooltip, Spin, Alert, Space } from 'antd';
import { SearchOutlined, PlusOutlined, ShareAltOutlined, CheckOutlined, CameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  getObservations,
  addObservation,
  deleteObservation,
  shareObservationToPublic,
} from '../../entities/observation/model/observationStore';
import type { CreateObservationInput, Observation } from '../../entities/observation/model/types';
import { ObservationCard } from '../../entities/observation/ui/ObservationCard';
import { AddObservationModal } from '../../features/add-observation/ui/AddObservationModal';
import { MOCK_CURRENT_USER } from '../../entities/user/model/mock';

const { Title, Text } = Typography;

export const GalleryPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Observation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadMyObservations = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        const myItems = getObservations().filter((obs) => obs.user_id === MOCK_CURRENT_USER.id);
        setItems(myItems);
        setLoading(false);
      } catch {
        setError('Не удалось загрузить личную галерею наблюдений.');
        setLoading(false);
      }
    }, 450);
  };

  useEffect(() => {
    loadMyObservations();
  }, []);

  const handleCreate = (data: CreateObservationInput) => {
    addObservation(data);
    loadMyObservations();
    message.success('Новое наблюдение добавлено!');
  };

  const handleDelete = (id: number) => {
    deleteObservation(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    message.info('Запись удалена из личной галереи');
  };

  const handleShare = (id: number) => {
    shareObservationToPublic(id);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_public: true } : item))
    );
    message.success('Фото опубликовано в общей галерее!');
  };

  const filteredItems = items.filter((item) => {
    const matchName =
      item.species.common_name.toLowerCase().includes(search.toLowerCase()) ||
      item.species.latin_name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Все' || item.species.category === category;
    return matchName && matchCat;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#0A3323' }}>Моя галерея</Title>
          <Text style={{ color: '#5a6e4d' }}>Сохранено находок: {items.length}</Text>
        </div>
        <Space>
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            style={{ borderColor: '#839958', color: '#0A3323' }}
          >
            Добавить вручную
          </Button>
          <Button
            type="primary"
            icon={<CameraOutlined />}
            onClick={() => navigate('/recognize')}
            style={{ background: '#839958', borderColor: '#839958' }}
          >
            Новое распознавание
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={16}>
          <Input
            placeholder="Поиск по названию или латыни..."
            prefix={<SearchOutlined style={{ color: '#839958' }} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            size="large"
            style={{ borderRadius: 8, borderColor: '#839958' }}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Select
            value={category}
            onChange={setCategory}
            style={{ width: '100%' }}
            size="large"
            options={[
              { value: 'Все', label: 'Все отряды птиц' },
              { value: 'Воробьинообразные', label: 'Воробьинообразные' },
              { value: 'Ракшеобразные', label: 'Ракшеобразные' },
              { value: 'Совообразные', label: 'Совообразные' },
            ]}
          />
        </Col>
      </Row>

      {error && (
        <Alert
          type="error"
          message="Ошибка загрузки"
          description={error}
          showIcon
          action={<Button size="small" onClick={loadMyObservations}>Повторить</Button>}
          style={{ marginBottom: 24 }}
        />
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" tip="Загрузка ваших наблюдений..." />
        </div>
      ) : filteredItems.length === 0 ? (
        <Empty description="В галерее пока нет подходящих записей" style={{ marginTop: 40 }} />
      ) : (
        <Row gutter={[20, 20]}>
          {filteredItems.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <ObservationCard
                observation={item}
                canDelete
                onDelete={handleDelete}
                extraAction={
                  item.is_public ? (
                    <Tooltip title="Уже в общей галерее">
                      <Button type="text" disabled icon={<CheckOutlined style={{ color: '#839958' }} />}>
                        В общей
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      type="text"
                      style={{ color: '#105666' }}
                      icon={<ShareAltOutlined />}
                      onClick={() => handleShare(item.id)}
                    >
                      Поделиться
                    </Button>
                  )
                }
              />
            </Col>
          ))}
        </Row>
      )}

      <AddObservationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};