import { view as BodyView } from '../views/body';
import { view as FooterView } from '../views/footer';
import { view as HeaderView } from '../views/header';
import { template } from '../views/templates/app';

export interface Props {
}

export interface State {
  stampRallyId: string;
}

const view = {
  components: {
    'my-body': <any>BodyView,
    'my-footer': <any>FooterView,
    'my-header': <any>HeaderView
  },
  data(): State {
    return {
      stampRallyId: 'bouzuya'
    };
  },
  methods: {
    switchStampRally(this: Props & State, stampRallyId: string): void {
      this.stampRallyId = stampRallyId;
    }
  },
  template
};

export { view };
