import { EventEmitter } from 'events';

export interface Message {
  type: string;
}

export interface Listener {
  (message: Message): void;
}

export interface Publish {
  (message: Message): void;
}

export interface Subscribe {
  (listener: Listener): Unsubscribe;
}

export interface Unsubscribe {
  (): void;
}

export interface MessageBus {
  publish: Publish;
  subscribe: Subscribe;
}

const newMessageBus = (): MessageBus => {
  const subject = new EventEmitter();
  const publish: Publish = (message: Message): void => {
    // TODO: nextTick
    setTimeout(() => void subject.emit('data', message));
  };
  const subscribe: Subscribe = (listener: Listener): Unsubscribe => {
    const l = (message: Message): void => void listener(message);
    subject.on('data', l);
    return () => void subject.removeListener('data', l);
  };
  return { publish, subscribe };
};

export { newMessageBus };
