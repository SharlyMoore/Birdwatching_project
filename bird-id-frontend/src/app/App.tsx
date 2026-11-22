import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, ConfigProvider } from 'antd';
import { AuthPage } from '../pages/AuthPage';
import { RecognizePage } from '../pages/RecognizePage';
import { ResultPage } from '../pages/ResultPage';
import { GalleryPage } from '../pages/GalleryPage';
import { CommunityPage } from '../pages/CommunityPage';
import { QuizPage } from '../pages/QuizPage'; // Импорт страницы квиза

const { Header, Content } = Layout;

const NavigationWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (location.pathname === '/auth') {
    return <>{children}</>;
  }

  const items = [
    { key: '/recognize', label: <Link to="/recognize">Распознать</Link> },
    { key: '/gallery', label: <Link to="/gallery">Моя галерея</Link> },
    { key: '/community', label: <Link to="/community">Общая галерея</Link> },
    { key: '/quiz', label: <Link to="/quiz">Тест</Link> }, // Вкладка квиза
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#839958',
          colorInfo: '#105666',
          colorError: '#D3968C',
          colorBgBase: '#ffffff',
          colorTextBase: '#0A3323',
        },
        components: {
          Menu: {
            darkItemSelectedBg: '#105666',
            darkItemHoverBg: '#164e37',
            darkItemSelectedColor: '#F7F4D5',
            darkItemColor: '#e0dfc5',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#F7F4D5' }}>
        <Header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          background: '#0A3323', 
          padding: '0 24px' 
        }}>
          <div style={{ color: '#F7F4D5', fontWeight: 'bold', fontSize: 20, marginRight: 36, letterSpacing: '0.5px' }}>
            BioID
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={items}
            style={{ 
              minWidth: 480, 
              background: 'inherit',
              borderBottom: 'none' 
            }}
          />

          <Link 
            to="/auth" 
            style={{ 
              marginLeft: 'auto', 
              color: '#D3968C', 
              textDecoration: 'none',
              fontWeight: 600 
            }}
          >
            Выход
          </Link>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <NavigationWrapper>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/recognize" element={<RecognizePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </NavigationWrapper>
    </BrowserRouter>
  );
}

export default App;