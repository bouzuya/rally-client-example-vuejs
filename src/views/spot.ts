import { template } from '../views/templates/spot';
import { Spot } from '../types/spot';

export interface Props {
  spot: Spot;
}

const view = {
  props: ['spot'],
  template,
  methods: {
    click(this: Props): void {
      // TODO
      console.log(`STAMP = ${this.spot.name}`);
    }
  }
};

export { view };
