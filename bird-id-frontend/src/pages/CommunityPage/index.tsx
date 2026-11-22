import { useState, useEffect } from 'react';
import { Input, Select, Row, Col, Typography, Empty, Space, Spin, Alert, Button } from 'antd';
import { SearchOutlined, GlobalOutlined } from '@ant-design/icons';
import { getObservations } from '../../entities/observation/model/observationStore';
import type { Observation } from '../../entities/observation/model/types';
import { ObservationCard } from '../../entities/observation/ui/ObservationCard';

const { Title, Paragraph } = Typography;

export const CommunityPage = () => {
  const [items, setItems] = useState<Observation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');

  const loadFeed = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        const publicOnly = getObservations().filter((obs) => obs.is_public);
        setItems(publicOnly);
        setLoading(false);
      } catch {
        setError('Не удалось загрузить ленту сообщества.');
        setLoading(false);
      }
    }, 450);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const filtered = items.filter((item) => {
    const matchName =
      item.species.common_name.toLowerCase().includes(search.toLowerCase()) ||
      item.species.latin_name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Все' || item.species.category === category;
    return matchName && matchCat;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <Space align="center">
          <GlobalOutlined style={{ fontSize: 28, color: '#105666' }} />
          <Title level={2} style={{ margin: 0, color: '#0A3323' }}>Общая галерея наблюдений</Title>
        </Space>
        <Paragraph style={{ color: '#556b2f', marginTop: 8 }}>
          Находки и снимки птиц, опубликованные участниками сообщества BioID
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={16}>
          <Input
            placeholder="Поиск по видам птиц..."
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
          message="Ошибка загрузки ленты"
          description={error}
          showIcon
          action={<Button size="small" onClick={loadFeed}>Повторить</Button>}
          style={{ marginBottom: 24 }}
        />
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" tip="Загрузка ленты сообщества..." />
        </div>
      ) : filtered.length === 0 ? (
        <Empty description="Ничего не найдено" style={{ marginTop: 40 }} />
      ) : (
        <Row gutter={[20, 20]}>
          {filtered.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <ObservationCard observation={item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};