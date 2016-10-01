export type State = any;

export interface UpdatedEvent {
  type: 'updated';
  state: State;
}

const createUpdatedEvent = (state: State): UpdatedEvent => {
  return { type: 'updated', state };
};

export { createUpdatedEvent };
