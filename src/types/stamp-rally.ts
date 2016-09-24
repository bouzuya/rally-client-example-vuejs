import { Spot } from './spot';

export interface StampRally {
  name: string;
  tagline: string;
  description: string;
  spots: Spot[];
  image: string | null;
}
