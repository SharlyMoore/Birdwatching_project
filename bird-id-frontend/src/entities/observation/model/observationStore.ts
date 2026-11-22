import { MOCK_OBSERVATIONS } from './mock';
import { MOCK_CURRENT_USER } from '../../user/model/mock';
import { MOCK_SPECIES } from '../../species/model/mock';
import type { CreateObservationInput, Observation } from './types';

let observationsState: Observation[] = [...MOCK_OBSERVATIONS];

export const getObservations = (): Observation[] => {
  return [...observationsState];
};

export const addObservation = (input: CreateObservationInput): Observation => {
  const species = MOCK_SPECIES.find((s) => s.id === input.species_id) ?? MOCK_SPECIES[0];
  const newItem: Observation = {
    id: Date.now(),
    user_id: MOCK_CURRENT_USER.id,
    species_id: species.id,
    image_url: input.image_url.trim(),
    confidence: input.confidence,
    notes: input.notes.trim(),
    is_public: input.is_public,
    created_at: new Date().toISOString(),
    author: MOCK_CURRENT_USER,
    species,
  };
  observationsState = [newItem, ...observationsState];
  return newItem;
};

export const deleteObservation = (id: number): void => {
  observationsState = observationsState.filter((item) => item.id !== id);
};

export const shareObservationToPublic = (id: number): void => {
  observationsState = observationsState.map((item) =>
    item.id === id ? { ...item, is_public: true } : item
  );
};