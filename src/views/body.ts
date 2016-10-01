import { Spot } from '../types/spot';
import { StampRally } from '../types/stamp-rally';
import { view as SpotView } from '../views/spot';
import { view as StampRallyView } from '../views/stamp-rally';
import { template } from '../views/templates/body';
import { MessageBus } from '../message-bus';
import { createStampCommand, createSwitchCommand } from '../message';
import { StampCard } from '../ensure-stamp-card';
import { connect } from './utils/connect';

export interface Props {
  bus: MessageBus;
  stampRallyId: string;
}

export interface State {
  stampCard: StampCard | null;
  stampRally: StampRally | null;
}

const view = {
  props: ['bus', 'stampRallyId'],
  components: {
    'my-spot': <any>SpotView,
    'my-stamp-rally': <any>StampRallyView
  },
  computed: {
    stampCardId(this: Props & State): string {
      const c = this.stampCard;
      return c === null ? '' : `StampCard = ${c.id}`;
    },
    stampRallySpots(this: Props & State): Spot[] {
      return this.stampRally === null ? [] : this.stampRally.spots;
    }
  },
  data(): State {
    return {
      stampCard: null,
      stampRally: null
    };
  },
  mounted(this: Props & State & { switch: Function; }) {
    this.switch(this.stampRallyId);
  },
  methods: {
    isStamped(this: Props & State, spot: Spot): boolean {
      if (this.stampCard === null) return false;
      return this.stampCard.spots.some((s) => s.id === spot.id && s.stamped);
    },
    stamp(this: Props & State, spotId: number): void {
      this.bus.publish(createStampCommand(spotId));
    },
    switch(this: Props & State, stampRallyId: string): void {
      this.bus.publish(createSwitchCommand(stampRallyId));
    }
  },
  template,
  watch: {
    stampRallyId(this: { switch: Function; }, newStampRallyId: string): void {
      this.switch(newStampRallyId);
    }
  }
};

const connectedView = connect(view, (state) => {
  const { stampCard, stampRally } = state;
  return { stampCard, stampRally };
});

export { connectedView as view };
