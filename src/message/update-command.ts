export interface UpdateCommand {
  type: 'update';
  state: any;
  next: any | null; // any message
}

const createUpdateCommand = (state: any, next?: any): UpdateCommand => {
  return {
    type: 'update', state, next: typeof next === 'undefined' ? null : next
  };
};

export { createUpdateCommand };
