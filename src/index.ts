import * as Vue from 'vue';
import { create, RallyClient } from 'rally-client';
import { ensureStampCard, StampCard } from './ensure-stamp-card';
import { ensureUser } from './ensure-user';

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

interface Spot {
  name: string;
  tagline: string;
  description: string;
  image: string | null;
}

interface StampRally {
  name: string;
  tagline: string;
  description: string;
  spots: Spot[];
  image: string | null;
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
  type Data = { count: number; stampCard: StampCard | null; };
  const client = create();
  const data: Data = { count: 0, stampCard: null };
  const vue = new Vue({
    el: '#app',
    data,
    computed: {
      message(this: Data): string {
        return `count = ${this.count}`;
      },
      stampCardId(this: Data): string {
        const c = this.stampCard;
        return c === null ? '' : `StampCard = ${c.id}`;
      }
    },
    methods: {
      click(this: Data): void {
        this.count += 1;
        if (this.stampCard !== null) return;
        const stampRallyId = 'bouzuya';
        getStampRally(client, stampRallyId)
          .then(({ name, tagline, description, image, spots }: StampRally) => {
            console.log(name);
            console.log(tagline);
            console.log(description);
            console.log(image);
            spots.forEach(({ name, tagline, description, image }) => {
              console.log(name);
              console.log(tagline);
              console.log(description);
              console.log(image);
            });
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
