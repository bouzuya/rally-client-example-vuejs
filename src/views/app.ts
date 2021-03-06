import { view as BodyView } from '../views/body';
import { view as FooterView } from '../views/footer';
import { view as HeaderView } from '../views/header';
import { template } from '../views/templates/app';
import { MessageBus } from '../message-bus';

export interface Props {
  bus: MessageBus;
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
  props: ['bus'],
  template
};

export { view };
