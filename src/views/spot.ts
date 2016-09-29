import { template } from '../views/templates/spot';
import { Spot } from '../types/spot';

export interface Props {
  spot: Spot;
  isStamped: boolean;
  onClickStampButton(spotId: number): void;
}

const view = {
  computed: {
    isDisabled(this: Props): boolean {
      return !this.spot.stampByLocation;
    },
    mapUrl(this: Props): string {
      const { lat, lng } = this.spot;
      return `https://maps.google.com/?q=${lat},${lng}`;
    }
  },
  props: ['spot', 'isStamped', 'onClickStampButton'],
  template,
  methods: {
    click(this: Props): void {
      // TODO: execute(createStampCommand(this.spot.id));
      if (!this.spot.stampByLocation) return;
      this.onClickStampButton(this.spot.id);
    }
  }
};

export { view };
