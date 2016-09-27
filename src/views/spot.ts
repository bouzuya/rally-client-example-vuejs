import { template } from '../views/templates/spot';
import { Spot } from '../types/spot';

export interface Props {
  spot: Spot;
  onClickStampButton(spotId: number): void;
}

const view = {
  computed: {
    mapUrl(this: Props): string {
      const { lat, lng } = this.spot;
      return `https://maps.google.com/?q=${lat},${lng}`;
    }
  },
  props: ['spot', 'onClickStampButton'],
  template,
  methods: {
    click(this: Props): void {
      // TODO: execute(createStampCommand(this.spot.id));
      this.onClickStampButton(this.spot.id);
    }
  }
};

export { view };
