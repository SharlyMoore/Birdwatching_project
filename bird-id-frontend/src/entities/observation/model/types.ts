import type { User } from '../../user/model/types';
import type { BirdSpecies } from '../../species/model/types';

export interface Observation {
  id: number;
  user_id: number;
  species_id: number;
  image_url: string;
  confidence: number;
  notes: string;
  is_public: boolean;
  created_at: string;
  author: User;
  species: BirdSpecies;
}

export interface CreateObservationInput {
  species_id: number;
  image_url: string;
  confidence: number;
  notes: string;
  is_public: boolean;
}