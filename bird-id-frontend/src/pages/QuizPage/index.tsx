import { useState } from 'react';
import { Card, Button, Typography, Space, Radio, Progress, Result, Tag, message } from 'antd';
import { 
  TrophyOutlined, 
  ReloadOutlined, 
  ArrowRightOutlined, 
  CheckCircleFilled, 
  CloseCircleFilled,
  HomeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { QUIZ_QUESTIONS } from '../../shared/api/quizData';

const { Title, Paragraph, Text } = Typography;

export const QuizPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleConfirmAnswer = () => {
    if (!selectedOption) {
      message.warning('Пожалуйста, выберите вариант ответа!');
      return;
    }

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      message.success('Верно!');
    } else {
      message.error('Увы, неверно.');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percent = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    let feedback = 'Хорошая попытка! Продолжайте изучать птиц.';
    if (score === 5) feedback = 'Идеальный результат! Вы настоящий эксперт-орнитолог!';
    else if (score >= 3) feedback = 'Отличные знания! Большинство видов определены верно.';

    return (
      <div style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px' }}>
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            background: '#ffffff',
            boxShadow: '0 8px 24px rgba(10, 51, 35, 0.08)',
            border: '1px solid #e7e2be',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Result
            icon={<TrophyOutlined style={{ color: '#839958', fontSize: 64 }} />}
            title={<span style={{ color: '#0A3323' }}>Тест завершен!</span>}
            subTitle={<span style={{ color: '#5a6e4d', fontSize: 16 }}>{feedback}</span>}
            extra={[
              <div key="score-stats" style={{ marginBottom: 24 }}>
                <Title level={3} style={{ color: '#105666', margin: '8px 0' }}>
                  Правильных ответов: {score} из {QUIZ_QUESTIONS.length}
                </Title>
                <div style={{ maxWidth: 320, margin: '0 auto' }}>
                  <Progress 
                    percent={percent} 
                    strokeColor="#839958"
                    trailColor="#ede8c4"
                  />
                </div>
              </div>,
              <Space key="actions" size="middle">
                <Button 
                  size="large" 
                  icon={<ReloadOutlined />} 
                  onClick={handleRestart}
                  style={{ borderColor: '#839958', color: '#0A3323' }}
                >
                  Пройти снова
                </Button>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<HomeOutlined />} 
                  onClick={() => navigate('/community')}
                  style={{ background: '#839958', borderColor: '#839958' }}
                >
                  В общую галерею
                </Button>
              </Space>
            ]}
          />
        </Card>
      </div>
    );
  }

  // Экран вопроса
  return (
    <div style={{ maxWidth: 680, margin: '30px auto', padding: '0 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={2} style={{ color: '#0A3323', margin: 0 }}>
          Орнитологический квиз
        </Title>
        <Paragraph style={{ color: '#5a6e4d', marginTop: 4 }}>
          Проверьте наблюдательность: определите вид птицы по фотографии
        </Paragraph>
      </div>

      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          background: '#ffffff',
          boxShadow: '0 8px 24px rgba(10, 51, 35, 0.08)',
          border: '1px solid #e7e2be',
          overflow: 'hidden',
        }}
        cover={
          <div style={{ position: 'relative', height: 320, background: '#000' }}>
            <img
              alt="Угадай птицу"
              src={currentQuestion.imageUrl}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <Tag color="#105666" style={{ fontSize: 13, padding: '4px 10px', borderRadius: 6 }}>
                Вопрос {currentIndex + 1} из {QUIZ_QUESTIONS.length}
              </Tag>
            </div>
          </div>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Progress
            percent={((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}
            showInfo={false}
            strokeColor="#839958"
            trailColor="#ede8c4"
            size="small"
          />
        </div>

        <Title level={4} style={{ color: '#0A3323', marginBottom: 16 }}>
          Какая птица изображена на снимке?
        </Title>

        <Radio.Group
          value={selectedOption}
          onChange={(e) => !isAnswered && setSelectedOption(e.target.value)}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            {currentQuestion.options.map((option) => {
              let background = '#faf9f0';
              let borderColor = '#ede8c4';

              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  background = '#eef5ea';
                  borderColor = '#839958';
                } else if (option === selectedOption) {
                  background = '#faecea';
                  borderColor = '#D3968C';
                }
              } else if (option === selectedOption) {
                background = '#f2f6ee';
                borderColor = '#839958';
              }

              return (
                <div
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: `1.5px solid ${borderColor}`,
                    background,
                    transition: 'all 0.2s',
                    cursor: isAnswered ? 'default' : 'pointer',
                  }}
                  onClick={() => !isAnswered && setSelectedOption(option)}
                >
                  <Radio value={option} disabled={isAnswered}>
                    <Text strong={option === selectedOption} style={{ color: '#0A3323', fontSize: 15 }}>
                      {option}
                    </Text>
                  </Radio>
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <CheckCircleFilled style={{ color: '#839958', fontSize: 18 }} />
                  )}
                  {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                    <CloseCircleFilled style={{ color: '#D3968C', fontSize: 18 }} />
                  )}
                </div>
              );
            })}
          </Space>
        </Radio.Group>

        {isAnswered && (
          <div style={{ marginTop: 20, padding: 14, background: '#fcfbf4', borderRadius: 8, borderLeft: '4px solid #839958' }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              💡 <strong style={{ color: '#0A3323' }}>Подсказка:</strong> {currentQuestion.hint}
            </Text>
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          {!isAnswered ? (
            <Button
              type="primary"
              size="large"
              onClick={handleConfirmAnswer}
              style={{ background: '#839958', borderColor: '#839958', borderRadius: 8 }}
            >
              Ответить
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={handleNextQuestion}
              style={{ background: '#105666', borderColor: '#105666', borderRadius: 8 }}
            >
              {currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Следующий вопрос' : 'Посмотреть итог'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};