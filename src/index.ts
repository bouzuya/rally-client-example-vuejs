import * as Vue from 'vue';

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
