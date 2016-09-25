import { template } from '../views/templates/spot';
import { Spot } from '../types/spot';

export interface Props {
  spot: Spot;
  onClickStampButton(spotId: number): void;
}

const view = {
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
