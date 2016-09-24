import * as Vue from 'vue';
import { create } from 'rally-client';
import { ensureStampCard, StampCard } from './ensure-stamp-card';
import { ensureUser } from './ensure-user';

const getStampCard = (stampRallyId: string): Promise<StampCard> => {
  const client = create();
  return ensureUser(client).then((user) => {
    return ensureStampCard(client, stampRallyId, user.id);
  });
};

const main = (): void => {
  type Data = { count: number; stampCard: StampCard | null; };
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
        getStampCard(stampRallyId)
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
