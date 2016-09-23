import * as Vue from 'vue';
import { create } from 'rally-client';
import { ensureStampCard } from './ensure-stamp-card';
import { ensureUser } from './ensure-user';

const showStampCard = (stampRallyId: string): void => {
  const client = create();
  ensureUser(client)
    .then((user) => {
      console.log(user);
      return ensureStampCard(client, stampRallyId, user.id);
    })
    .then((stampCard) => {
      console.log(stampCard);
    });
};

const main = (): void => {
  type Data = { count: number; };
  const data: Data = { count: 0 };
  const vue = new Vue({
    el: '#app',
    data,
    computed: {
      message(this: Data): string {
        return `count = ${this.count}`;
      }
    },
    methods: {
      click(this: Data): void {
        this.count += 1;
        const stampRallyId = 'bouzuya';
        showStampCard(stampRallyId);
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
