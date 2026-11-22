import type { BirdSpecies } from './types';

export const MOCK_SPECIES: BirdSpecies[] = [
  {
    id: 1,
    common_name: 'Большая синица',
    latin_name: 'Parus major',
    category: 'Воробьинообразные',
    description: 'Один из самых распространённых видов птиц в парках и садах с жёлтой грудкой.',
  },
  {
    id: 2,
    common_name: 'Обыкновенный зимородок',
    latin_name: 'Alcedo atthis',
    category: 'Ракшеобразные',
    description: 'Небольшая яркая птица с бирюзово-синим оперением, обитающая у чистых водоёмов.',
  },
  {
    id: 3,
    common_name: 'Ушастая сова',
    latin_name: 'Asio otus',
    category: 'Совообразные',
    description: 'Ночной хищник с характерными перьевыми «ушками» и оранжевыми глазами.',
  },
  {
    id: 4,
    common_name: 'Обыкновенный снегирь',
    latin_name: 'Pyrrhula pyrrhula',
    category: 'Воробьинообразные',
    description: 'Певчая птица семейства вьюрковых; самцы отличаются яркой красной грудкой.',
  },
];