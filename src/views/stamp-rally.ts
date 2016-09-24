import { Spot } from '../types/spot';
import { StampRally } from '../types/stamp-rally';
import { template } from '../templates/stamp-rally';

type StampRallyData = {
  stampRally: StampRally | null;
};

const view = {
  computed: {
    stampRallyName(this: StampRallyData): string {
      return this.stampRally === null ? '' : this.stampRally.name;
    },
    stampRallyTagline(this: StampRallyData): string {
      return this.stampRally === null ? '' : this.stampRally.tagline;
    },
    stampRallyDescription(this: StampRallyData): string {
      return this.stampRally === null ? '' : this.stampRally.description;
    },
    stampRallyImage(this: StampRallyData): string | null {
      return this.stampRally === null ? null : this.stampRally.image;
    },
    stampRallySpots(this: StampRallyData): Spot[] {
      return this.stampRally === null ? [] : this.stampRally.spots;
    }
  },
  props: ['stamp-rally'],
  template
};

export { view };
