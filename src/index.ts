import * as Vue from 'vue';
import { view as AppView } from './views/app';

const main = (): void => {
  const vue = new Vue({
    el: '#app',
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
