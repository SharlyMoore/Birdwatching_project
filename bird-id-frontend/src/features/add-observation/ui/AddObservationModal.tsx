import { useState } from 'react';
import { Modal, Form, Select, Input, InputNumber, Switch, Button, Space } from 'antd';
import { MOCK_SPECIES } from '../../../entities/species/model/mock';
import type { CreateObservationInput } from '../../../entities/observation/model/types';

interface AddObservationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateObservationInput) => void;
}

interface FormErrors {
  species_id?: string;
  image_url?: string;
  confidence?: string;
  notes?: string;
}

export const AddObservationModal = ({ open, onClose, onSubmit }: AddObservationModalProps) => {
  const [speciesId, setSpeciesId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [confidence, setConfidence] = useState<number>(0.9);
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!speciesId) {
      nextErrors.species_id = 'Выберите вид птицы из справочника';
    }

    const trimmedUrl = imageUrl.trim();
    const isValidUrl =
      trimmedUrl.startsWith('http://') ||
      trimmedUrl.startsWith('https://') ||
      trimmedUrl.startsWith('/birds/');
    if (!trimmedUrl) {
      nextErrors.image_url = 'Укажите ссылку на фотографию';
    } else if (!isValidUrl) {
      nextErrors.image_url = 'Ссылка должна начинаться с http://, https:// или /birds/';
    }

    if (confidence <= 0 || confidence > 1) {
      nextErrors.confidence = 'Уверенность должна быть от 0.01 до 1.00';
    }

    if (notes.trim().length < 5) {
      nextErrors.notes = 'Добавьте заметку (минимум 5 символов)';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate() || !speciesId) return;

    onSubmit({
      species_id: speciesId,
      image_url: imageUrl,
      confidence,
      notes,
      is_public: isPublic,
    });

    setSpeciesId(null);
    setImageUrl('');
    setConfidence(0.9);
    setNotes('');
    setIsPublic(true);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      title="Новое наблюдение птицы"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSave}
          style={{ background: '#839958', borderColor: '#839958' }}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Form layout="vertical" style={{ marginTop: 12 }}>
        <Form.Item
          label="Вид птицы"
          required
          validateStatus={errors.species_id ? 'error' : ''}
          help={errors.species_id}
        >
          <Select
            placeholder="Выберите вид из списка"
            value={speciesId}
            onChange={(val) => {
              setSpeciesId(val);
              setErrors((prev) => ({ ...prev, species_id: undefined }));
            }}
            options={MOCK_SPECIES.map((s) => ({
              value: s.id,
              label: `${s.common_name} (${s.latin_name})`,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Ссылка на изображение"
          required
          validateStatus={errors.image_url ? 'error' : ''}
          help={errors.image_url}
        >
          <Input
            placeholder="https://... или /birds/tit.jpg"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setErrors((prev) => ({ ...prev, image_url: undefined }));
            }}
          />
        </Form.Item>

        <Form.Item
          label="Уверенность определения (0.01 – 1.00)"
          validateStatus={errors.confidence ? 'error' : ''}
          help={errors.confidence}
        >
          <InputNumber
            min={0.01}
            max={1}
            step={0.05}
            value={confidence}
            onChange={(val) => setConfidence(val ?? 0.9)}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Заметка о наблюдении"
          required
          validateStatus={errors.notes ? 'error' : ''}
          help={errors.notes}
        >
          <Input.TextArea
            rows={3}
            placeholder="Где и при каких условиях замечена птица..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setErrors((prev) => ({ ...prev, notes: undefined }));
            }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space>
            <Switch checked={isPublic} onChange={setIsPublic} />
            <span>Опубликовать в общей галерее сообщества</span>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};