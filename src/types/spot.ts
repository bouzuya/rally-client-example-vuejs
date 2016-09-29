export interface Spot {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image: string | null;
  lat: number;
  lng: number;
  stampByLocation: true;
}
