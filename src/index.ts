import * as Vue from 'vue';
import { create } from 'rally-client';
import { view as AppView } from './views/app';

const main = (): void => {
  const client = create();
  const vue = new Vue({
    el: '#app',
    data: { client },
    components: {
      'my-app': AppView
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
