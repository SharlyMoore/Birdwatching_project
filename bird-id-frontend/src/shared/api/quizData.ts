export interface QuizQuestion {
  id: number;
  imageUrl: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    imageUrl: '/birds/bullfinch.jpg',
    options: ['Снегирь', 'Зяблик', 'Зарянка', 'Чечётка'],
    correctAnswer: 'Снегирь',
    hint: 'Самцы этого вида имеют узнаваемую алую грудку и часто встречаются зимой у кормушек.',
  },
  {
    id: 2,
    imageUrl: '/birds/chaffinch.jpg',
    options: ['Дрозд-рябинник', 'Зяблик', 'Чиж', 'Зеленушка'],
    correctAnswer: 'Зяблик',
    hint: 'Одна из самых многочисленных певчих птиц наших парков с белыми полосками на крыльях.',
  },
  {
    id: 3,
    imageUrl: '/birds/bluetit.jpg',
    options: ['Большая синица', 'Лазоревка', 'Московка', 'Поползень'],
    correctAnswer: 'Лазоревка',
    hint: 'Небольшая птица с характерной лазурно-голубой шапочкой на голове.',
  },
  {
    id: 4,
    imageUrl: '/birds/jay.jpg',
    options: ['Сойка', 'Кедровка', 'Свиристель', 'Щегол'],
    correctAnswer: 'Сойка',
    hint: 'Лесной пересмешник с яркими ярко-голубыми перьями на крыльях с черными полосками.',
  },
  {
    id: 5,
    imageUrl: '/birds/nuthatch.jpg',
    options: ['Клест-еловик', 'Поползень', 'Дрозд певчий', 'Пищуха'],
    correctAnswer: 'Поползень',
    hint: 'Единственная птица наших лесов, умеющая быстро бегать по стволу вниз головой.',
  },
];