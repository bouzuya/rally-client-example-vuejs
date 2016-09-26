import { template } from '../views/templates/header';

export interface Props {
  onClickSwitchButton(stampRallyId: string): void;
}

export interface State {
  stampRallyId: string | null;
}

const view = {
  data(): State {
    return { stampRallyId: 'bouzuya' };
  },
  props: ['onClickSwitchButton'],
  template,
  methods: {
    click(this: Props & State): void {
      if (this.stampRallyId === null) return;
      this.onClickSwitchButton(this.stampRallyId);
    }
  }
};

export { view };
