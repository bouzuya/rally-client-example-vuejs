import { template } from '../views/templates/header';

export interface Props {
}

export interface State {
  stampRallyId: string | null;
}

const view = {
  data(): State {
    return { stampRallyId: 'bouzuya' };
  },
  template,
  methods: {
    click(this: Props & State & { $emit: Function; }): void {
      if (this.stampRallyId === null) return;
      this.$emit('switch-stamp-rally', this.stampRallyId);
    }
  }
};

export { view };
