import { Spot } from '../types/spot';
import { StampRally } from '../types/stamp-rally';
import { template } from '../views/templates/stamp-rally';
import { view as SpotView } from '../views/spot';

export interface Props {
  stampRally: StampRally | null;
  onClickStampButton(spotId: number): void;
}

const view = {
  computed: {
    stampRallyName(this: Props): string {
      return this.stampRally === null ? '' : this.stampRally.name;
    },
    stampRallyTagline(this: Props): string {
      return this.stampRally === null ? '' : this.stampRally.tagline;
    },
    stampRallyDescription(this: Props): string {
      return this.stampRally === null ? '' : this.stampRally.description;
    },
    stampRallyImage(this: Props): string | null {
      return this.stampRally === null ? null : this.stampRally.image;
    },
    stampRallySpots(this: Props): Spot[] {
      return this.stampRally === null ? [] : this.stampRally.spots;
    }
  },
  components: {
    'my-spot': <any>SpotView
  },
  props: ['stampRally', 'onClickStampButton'],
  template
};

export { view };
