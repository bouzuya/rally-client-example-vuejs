import { template } from '../views/templates/spot';
import { Spot } from '../types/spot';

export interface Props {
  spot: Spot;
}

const view = {
  props: ['spot'],
  template
};

export { view };
