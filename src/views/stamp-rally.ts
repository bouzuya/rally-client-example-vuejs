import { StampRally } from '../types/stamp-rally';
import { template } from '../views/templates/stamp-rally';

export interface Props {
  stampRally: StampRally | null;
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
    }
  },
  props: ['stampRally'],
  template
};

export { view };
