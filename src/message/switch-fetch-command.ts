export interface SwitchFetchCommand {
  type: 'switch-fetch';
}

const createSwitchFetchCommand = (): SwitchFetchCommand => {
  return { type: 'switch-fetch' };
};

export { createSwitchFetchCommand };
