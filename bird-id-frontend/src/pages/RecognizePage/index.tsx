import { useState } from 'react';
import { Upload, Button, Card, Progress, Typography, Alert, message } from 'antd';
import { InboxOutlined, ThunderboltOutlined, ReloadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

export const RecognizePage = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  const handleUploadChange = (info: { fileList: UploadFile[] }) => {
    const latest = info.fileList.slice(-1);
    setFileList(latest);
    if (latest.length > 0 && latest[0].originFileObj) {
      setPreviewUrl(URL.createObjectURL(latest[0].originFileObj));
      setProgress(0);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleStartRecognition = () => {
    if (fileList.length === 0) {
      message.warning('Сначала прикрепите изображение!');
      return;
    }

    setIsProcessing(true);
    setProgress(20);
    setStatusMessage('Запрос в очереди нейросети...');

    setTimeout(() => {
      setProgress(65);
      setStatusMessage('Модель классифицирует изображение...');
    }, 700);

    setTimeout(() => {
      setIsProcessing(false);
      
      navigate('/result', {
        state: {
          commonName: 'Большая синица',
          latinName: 'Parus major',
          confidence: 0.95,
          category: 'Птицы',
          description: 'Птица отряда воробьинообразных с характерным желтым брюшком и черным галстуком.',
          imageUrl: previewUrl || 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop',
        },
      });
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 700, margin: '30px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={2}>Сканер видов</Title>
        <Paragraph type="secondary">Загрузите снимок для автоматической идентификации нейросетью</Paragraph>
      </div>

      <Card bordered={false} style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
        <Dragger
          multiple={false}
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          accept="image/*"
          showUploadList={false}
          style={{ padding: '24px', background: '#fafafa', borderRadius: 8 }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#839958', fontSize: 44 }} />
          </p>
          <p className="ant-upload-text">Перетащите сюда фото птицы или нажмите для выбора</p>
          <p className="ant-upload-hint">Поддерживаются форматы JPG, PNG, WEBP</p>
        </Dragger>

        {previewUrl && (
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <img src={previewUrl} alt="Выбранное фото" style={{ maxHeight: 250, maxWidth: '100%', borderRadius: 8 }} />
          </div>
        )}

        <div style={{ marginTop: 20, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Button
            type="primary"
            size="large"
            icon={<ThunderboltOutlined />}
            onClick={handleStartRecognition}
            loading={isProcessing}
            disabled={fileList.length === 0}
          >
            {isProcessing ? 'Обработка...' : 'Распознать'}
          </Button>

          {previewUrl && (
            <Button size="large" icon={<ReloadOutlined />} onClick={() => { setFileList([]); setPreviewUrl(null); }}>
              Сброс
            </Button>
          )}
        </div>

        {isProcessing && (
          <div style={{ marginTop: 20 }}>
            <Alert message={statusMessage} type="info" showIcon style={{ marginBottom: 10 }} />
            <Progress percent={progress} status="active" />
          </div>
        )}
      </Card>
    </div>
  );
};