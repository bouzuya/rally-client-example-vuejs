import { diff, applyChange } from 'deep-diff';
import { MessageBus } from '../../message-bus';
import { Message } from '../../message';

const merge = (target: any, source: any): void => {
  if (typeof target === 'undefined' || target === null) return;
  const patches = diff(target, source);
  if (typeof patches === 'undefined') return;
  patches.forEach((patch: any) => applyChange(target, source, patch));
};

function connect(view: any, mapStateToProps: (state: any) => any): any {
  const originalMounted = view.mounted;
  const originalDestroyed = view.destroyed;
  return Object.assign(view, {
    mounted(
      this: { $data: any; bus: MessageBus; unsubscribe: Function; }
    ): void {
      this.unsubscribe = this.bus.subscribe((message: Message) => {
        if (message.type === 'updated') {
          merge(this.$data, mapStateToProps(message.state));
        }
      });
      if (typeof originalMounted === 'function') {
        originalMounted.call(this);
      }
    },
    destroyed(this: { unsubscribe: Function; }): void {
      if (typeof this.unsubscribe !== 'undefined') this.unsubscribe();
      if (typeof originalDestroyed === 'function') {
        originalDestroyed.call(this);
      }
    }
  });
};

export { connect };
