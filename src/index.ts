import * as Vue from 'vue';
import { view as AppView } from './views/app';
import { newMessageBus } from './message-bus';

const main = (): void => {
  const bus = newMessageBus();
  new Vue({
    el: '#app',
    data: { bus },
    components: {
      'my-app': AppView
    }
  });
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
