import { Spot } from './spot';

export interface StampRally {
  id: string;
  name: string;
  tagline: string;
  description: string;
  spots: Spot[];
  image: string | null;
}
