import { RallyClient } from 'rally-client';
import { ensureStampCard, StampCard } from '../ensure-stamp-card';
import { ensureUser } from '../ensure-user';
import { StampRally } from '../types/stamp-rally';
import { view as StampRallyView } from '../views/stamp-rally';
import { template } from '../views/templates/app';

interface ApiSpot {
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
        const name = spot.name;
        const taglineHtml = spot.tagline;
        const descriptionHtml = spot.description;
        const image = spot.images.length > 0 ? spot.images[0].s640 : null;
        return {
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
  client: RallyClient;
}

export interface State {
  stampCard: StampCard | null;
  stampRally: StampRally | null;
}

const view = {
  props: ['client'],
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
    return { stampCard: null, stampRally: null };
  },
  methods: {
    click(this: Props & State): void {
      if (this.stampCard !== null) return;
      const stampRallyId = 'bouzuya';
      getStampRally(this.client, stampRallyId)
        .then((stampRally) => {
          this.stampRally = stampRally;
        });
      getStampCard(this.client, stampRallyId)
        .then((stampCard) => {
          this.stampCard = stampCard;
        });
    }
  },
  template
};

export { view };
