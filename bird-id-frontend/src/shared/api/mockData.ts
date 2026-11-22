export interface Observation {
  id: string;
  commonName: string;
  latinName: string;
  category: 'Птицы' | 'Растения' | 'Грибы';
  confidence: number;
  imageUrl: string;
  description: string;
  date: string;
  author?: string;
  isShared?: boolean;
}

export let initialObservations: Observation[] = [
  {
    id: 'obs-1',
    commonName: 'Снегирь',
    latinName: 'Pyrrhula pyrrhula',
    category: 'Птицы',
    confidence: 0.98,
    imageUrl: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e23?w=600&auto=format&fit=crop',
    description: 'Птица с ярко-красной грудкой у самцов, частый гость зимних кормушек.',
    date: '2026-09-20',
    isShared: true,
  },
  {
    id: 'obs-2',
    commonName: 'Зяблик',
    latinName: 'Fringilla coelebs',
    category: 'Птицы',
    confidence: 0.91,
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop',
    description: 'Одна из самых многочисленных певчих птиц лесов и парков.',
    date: '2026-09-22',
    isShared: false,
  },
];

export let publicObservations: Observation[] = [
  {
    id: 'pub-1',
    commonName: 'Снегирь',
    latinName: 'Pyrrhula pyrrhula',
    category: 'Птицы',
    confidence: 0.98,
    imageUrl: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e23?w=600&auto=format&fit=crop',
    description: 'Птица с ярко-красной грудкой у самцов, частый гость зимних кормушек.',
    date: '2026-09-20',
    author: 'Дарья',
  },
  {
    id: 'pub-2',
    commonName: 'Лазоревка',
    latinName: 'Cyanistes caeruleus',
    category: 'Птицы',
    confidence: 0.94,
    imageUrl: 'https://images.unsplash.com/photo-1549608276-5786777e6587?w=600&auto=format&fit=crop',
    description: 'Мелкая синица с характерной лазурно-голубой шапочкой.',
    date: '2026-09-25',
    author: 'Алексей С.',
  },
];

export const addObservation = (item: Observation) => {
  initialObservations = [item, ...initialObservations];
};

export const removeObservation = (id: string) => {
  initialObservations = initialObservations.filter((obs) => obs.id !== id);
};

export const shareToPublic = (id: string, authorName = 'Вы') => {
  const item = initialObservations.find((obs) => obs.id === id);
  if (item && !item.isShared) {
    item.isShared = true;
    publicObservations = [
      {
        ...item,
        id: `pub-${Date.now()}`,
        author: authorName,
      },
      ...publicObservations,
    ];
  }
};