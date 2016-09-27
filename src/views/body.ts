import { create, RallyClient } from 'rally-client';
import { createStamp } from '../create-stamp';
import { ensureStampCard, StampCard } from '../ensure-stamp-card';
import { ensureUser } from '../ensure-user';
import { getLocation } from '../get-location';
import { StampRally } from '../types/stamp-rally';
import { view as StampRallyView } from '../views/stamp-rally';
import { template } from '../views/templates/body';

interface ApiSpot {
  id: number;
  name: string;
  tagline: string | null;
  description: string | null;
  images: { s640: string; }[];
}

interface ApiStampRally {
  displayName: string;
  tagline: string | null;
  description: string | null;
  spots: ApiSpot[];
  images: { s640: string; }[];
}

const getStampRally = (
  client: RallyClient, stampRallyId: string
): Promise<StampRally> => {
  return client.call({
    method: 'GET',
    path: `/rallies/${stampRallyId}`
  }).then((rally: ApiStampRally) => {
    const name = rally.displayName;
    const taglineHtml = rally.tagline;
    const descriptionHtml = rally.description;
    const spots = rally.spots;
    const image = rally.images.length > 0 ? rally.images[0].s640 : null;
    return {
      name,
      tagline: taglineHtml === null ? '' : taglineHtml,
      description: descriptionHtml === null ? '' : descriptionHtml,
      image,
      spots: spots.map((spot) => {
        const id = spot.id;
        const name = spot.name;
        const taglineHtml = spot.tagline;
        const descriptionHtml = spot.description;
        const image = spot.images.length > 0 ? spot.images[0].s640 : null;
        return {
          id,
          name,
          tagline: taglineHtml === null ? '' : taglineHtml,
          description: descriptionHtml === null ? '' : descriptionHtml,
          image
        };
      })
    };
  });
};

const getStampCard = (
  client: RallyClient, stampRallyId: string
): Promise<StampCard> => {
  return ensureUser(client).then((user) => {
    return ensureStampCard(client, stampRallyId, user.id);
  });
};

export interface Props {
  stampRallyId: string;
}

export interface State {
  client: RallyClient;
  stampCard: StampCard | null;
  stampRally: StampRally | null;
}

const view = {
  props: ['stampRallyId'],
  components: {
    'my-stamp-rally': <any>StampRallyView
  },
  computed: {
    stampCardId(this: Props & State): string {
      const c = this.stampCard;
      return c === null ? '' : `StampCard = ${c.id}`;
    }
  },
  data(): State {
    return {
      client: create(),
      stampCard: null,
      stampRally: null
    };
  },
  mounted(this: Props & State & { switch: Function; }) {
    this.switch(this.stampRallyId);
  },
  methods: {
    onClickStampButton(this: Props & State, spotId: number): void {
      Promise.all([
        getStampCard(this.client, this.stampRallyId),
        getLocation()
      ])
        .then(([stampCard, { lat, lng }]) => {
          return createStamp(this.client, stampCard.id, spotId, lat, lng);
        });
    },
    switch(this: Props & State, stampRallyId: string): void {
      this.stampCard = null;
      this.stampRally = null;
      if (this.stampCard === null) {
        getStampCard(this.client, stampRallyId)
          .then((stampCard) => {
            this.stampCard = stampCard;
          });
      }
      if (this.stampRally === null) {
        getStampRally(this.client, stampRallyId)
          .then((stampRally) => {
            this.stampRally = stampRally;
          });
      }
    }
  },
  template,
  watch: {
    stampRallyId(this: { switch: Function; }, newStampRallyId: string): void {
      this.switch(newStampRallyId);
    }
  }
};

export { view };