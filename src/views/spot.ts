import { template } from '../views/templates/spot';
import { Spot } from '../types/spot';

export interface Props {
  stampRallyId: string;
  spot: Spot;
  isStamped: boolean;
}

const view = {
  computed: {
    isDisabled(this: Props): boolean {
      return !this.spot.stampByLocation;
    },
    mapUrl(this: Props): string {
      const { lat, lng } = this.spot;
      return `https://maps.google.com/?q=${lat},${lng}`;
    },
    spotUrl(this: Props): string {
      const baseUrl = `https://${this.stampRallyId}.stamprally.net`;
      return `${baseUrl}/#/spots/${this.spot.id}`;
    }
  },
  props: ['spot', 'stampRallyId', 'isStamped'],
  template,
  methods: {
    click(this: Props & { $emit: Function; }): void {
      // TODO: execute(createStampCommand(this.spot.id));
      if (!this.spot.stampByLocation) return;
      if (this.isStamped) return;
      this.$emit('stamp', this.spot.id);
    }
  }
};

export { view };
