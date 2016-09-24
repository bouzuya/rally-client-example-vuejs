import * as Vue from 'vue';
import { create, RallyClient } from 'rally-client';
import { ensureStampCard, StampCard } from './ensure-stamp-card';
import { ensureUser } from './ensure-user';
import { StampRally } from './types/stamp-rally';

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

const main = (): void => {
  const client = create();
  type AppData = {
    count: number;
    stampCard: StampCard | null;
    stampRally: StampRally | null;
  };
  const data: AppData = { count: 0, stampCard: null, stampRally: null };
  const vue = new Vue({
    el: '#app',
    data,
    computed: {
      message(this: AppData): string {
        return `count = ${this.count}`;
      },
      stampCardId(this: AppData): string {
        const c = this.stampCard;
        return c === null ? '' : `StampCard = ${c.id}`;
      }
    },
    methods: {
      click(this: AppData): void {
        this.count += 1;
        if (this.stampCard !== null) return;
        const stampRallyId = 'bouzuya';
        getStampRally(client, stampRallyId)
          .then((stampRally) => {
            this.stampRally = stampRally;
          });
        getStampCard(client, stampRallyId)
          .then((stampCard) => {
            this.stampCard = stampCard;
          });
      }
    }
  });
  console.log(vue);
};

const ready = (callback: Function): void => {
  if (typeof document === 'undefined') return void callback();
  if (document.readyState === 'complete') {
    setTimeout(() => callback());
  } else {
    document.addEventListener('DOMContentLoaded', function listener() {
      document.removeEventListener('DOMContentLoaded', listener);
      callback();
    });
  }
};

ready(main);
