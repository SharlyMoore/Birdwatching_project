import { useState } from 'react';
import { Card, Form, Input, Button, Tabs, Typography, Divider, message, ConfigProvider } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const BirdSilhouette = ({ style }: { style: React.CSSProperties }) => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    style={{ position: 'absolute', pointerEvents: 'none', ...style }}
  >
    <path d="M8 28 C 18 16, 28 20, 32 28 C 36 20, 46 16, 56 28 C 44 26, 36 34, 32 40 C 28 34, 20 26, 8 28 Z" />
  </svg>
);

export const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');

  const onFinishLogin = (values: any) => {
    message.success(`С возвращением! (${values.email})`);
    navigate('/recognize');
  };

  const onFinishRegister = () => {
    message.success('Регистрация успешна! Теперь выполните вход.');
    setActiveTab('login');
  };

  const handleGuestLogin = () => {
    message.info('Вход выполнен в гостевом режиме');
    navigate('/recognize');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#839958',
          colorTextBase: '#0A3323',
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          background: '#F7F4D5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px 16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Фоновые силуэты птиц */}
        <div style={{ color: '#839958', opacity: 0.22 }}>
          <BirdSilhouette style={{ width: 90, top: '8%', left: '10%', transform: 'rotate(-12deg)' }} />
          <BirdSilhouette style={{ width: 55, top: '16%', left: '22%', transform: 'rotate(-5deg)' }} />
          <BirdSilhouette style={{ width: 120, top: '12%', right: '12%', transform: 'rotate(18deg) scaleX(-1)' }} />
          <BirdSilhouette style={{ width: 70, top: '26%', right: '8%', transform: 'rotate(8deg) scaleX(-1)' }} />
          <BirdSilhouette style={{ width: 85, bottom: '14%', left: '8%', transform: 'rotate(15deg)' }} />
          <BirdSilhouette style={{ width: 110, bottom: '10%', right: '14%', transform: 'rotate(-16deg)' }} />
          <BirdSilhouette style={{ width: 45, bottom: '24%', right: '24%', transform: 'rotate(-25deg)' }} />
        </div>

        {/* Карточка авторизации */}
        <Card
          bordered={false}
          style={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 12px 32px rgba(10, 51, 35, 0.1)',
            border: '1px solid #e7e2be',
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2} style={{ color: '#0A3323', margin: 0, letterSpacing: '1px' }}>
              BioID
            </Title>
            <Paragraph style={{ color: '#5a6e4d', marginTop: 4, marginBottom: 0 }}>
              Определение птиц и флоры по фотографии
            </Paragraph>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            centered
            items={[
              {
                key: 'login',
                label: <span style={{ fontWeight: 600 }}>Вход</span>,
                children: (
                  <Form layout="vertical" onFinish={onFinishLogin} requiredMark={false} style={{ marginTop: 12 }}>
                    <Form.Item
                      label={<span style={{ color: '#0A3323' }}>Email</span>}
                      name="email"
                      rules={[
                        { required: true, message: 'Введите email' },
                        { type: 'email', message: 'Некорректный email' },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined style={{ color: '#839958' }} />}
                        placeholder="birdwatcher@mail.ru"
                        size="large"
                        style={{ borderRadius: 8, borderColor: '#dcd7b5' }}
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span style={{ color: '#0A3323' }}>Пароль</span>}
                      name="password"
                      rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined style={{ color: '#839958' }} />}
                        placeholder="••••••••"
                        size="large"
                        style={{ borderRadius: 8, borderColor: '#dcd7b5' }}
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      block
                      size="large"
                      htmlType="submit"
                      style={{
                        marginTop: 12,
                        borderRadius: 8,
                        background: '#839958',
                        borderColor: '#839958',
                        fontWeight: 600,
                      }}
                    >
                      Войти
                    </Button>
                  </Form>
                ),
              },
              {
                key: 'register',
                label: <span style={{ fontWeight: 600 }}>Регистрация</span>,
                children: (
                  <Form layout="vertical" onFinish={onFinishRegister} requiredMark={false} style={{ marginTop: 12 }}>
                    <Form.Item
                      label={<span style={{ color: '#0A3323' }}>Имя пользователя</span>}
                      name="username"
                      rules={[{ required: true, message: 'Введите имя' }]}
                    >
                      <Input
                        prefix={<UserOutlined style={{ color: '#839958' }} />}
                        placeholder="Орнитолог"
                        size="large"
                        style={{ borderRadius: 8, borderColor: '#dcd7b5' }}
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span style={{ color: '#0A3323' }}>Email</span>}
                      name="email"
                      rules={[
                        { required: true, message: 'Введите email' },
                        { type: 'email', message: 'Некорректный email' },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined style={{ color: '#839958' }} />}
                        placeholder="birdwatcher@mail.ru"
                        size="large"
                        style={{ borderRadius: 8, borderColor: '#dcd7b5' }}
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span style={{ color: '#0A3323' }}>Пароль</span>}
                      name="password"
                      rules={[
                        { required: true, message: 'Введите пароль' },
                        { min: 6, message: 'Минимум 6 символов' },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined style={{ color: '#839958' }} />}
                        placeholder="Минимум 6 знаков"
                        size="large"
                        style={{ borderRadius: 8, borderColor: '#dcd7b5' }}
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      block
                      size="large"
                      htmlType="submit"
                      style={{
                        marginTop: 12,
                        borderRadius: 8,
                        background: '#839958',
                        borderColor: '#839958',
                        fontWeight: 600,
                      }}
                    >
                      Зарегистрироваться
                    </Button>
                  </Form>
                ),
              },
            ]}
          />

          <Divider plain style={{ fontSize: 13, color: '#839958', borderColor: '#e7e2be' }}>
            или
          </Divider>

          <Button
            block
            size="large"
            icon={<SmileOutlined style={{ color: '#D3968C' }} />}
            onClick={handleGuestLogin}
            style={{
              borderRadius: 8,
              borderColor: '#D3968C',
              color: '#0A3323',
              background: '#fcfbf4',
              fontWeight: 500,
            }}
          >
            Войти как гость
          </Button>
        </Card>
      </div>
    </ConfigProvider>
  );
};