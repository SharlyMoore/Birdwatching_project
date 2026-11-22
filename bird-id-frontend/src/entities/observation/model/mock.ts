import type { Observation } from './types';
import { MOCK_CURRENT_USER, MOCK_OTHER_USER } from '../../user/model/mock';
import { MOCK_SPECIES } from '../../species/model/mock';

export const MOCK_OBSERVATIONS: Observation[] = [
  {
    id: 1,
    user_id: MOCK_CURRENT_USER.id,
    species_id: MOCK_SPECIES[0].id,
    image_url: '/birds/bluetit.jpg',
    confidence: 0.95,
    notes: 'Замечена у кормушки в парке, активна.',
    is_public: true,
    created_at: '2026-10-11T14:04:26.257989',
    author: MOCK_CURRENT_USER,
    species: MOCK_SPECIES[0],
  },
  {
    id: 2,
    user_id: MOCK_OTHER_USER.id,
    species_id: MOCK_SPECIES[1].id,
    image_url: '/birds/kingfisher.jpg',
    confidence: 0.89,
    notes: 'Сидел на ветке прямо над водой у тихой заводи.',
    is_public: true,
    created_at: '2026-10-12T11:20:10.000000',
    author: MOCK_OTHER_USER,
    species: MOCK_SPECIES[1],
  },
  {
    id: 3,
    user_id: MOCK_CURRENT_USER.id,
    species_id: MOCK_SPECIES[2].id,
    image_url: '/birds/owl.jpg',
    confidence: 0.92,
    notes: 'Личная заметка: сидела высоко на ели в сумерках.',
    is_public: false,
    created_at: '2026-10-13T18:45:00.000000',
    author: MOCK_CURRENT_USER,
    species: MOCK_SPECIES[2],
  },
];