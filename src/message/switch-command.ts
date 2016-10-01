export interface SwitchCommand {
  type: 'switch';
  stampRallyId: string;
}

const createSwitchCommand = (stampRallyId: string): SwitchCommand => {
  return { type: 'switch', stampRallyId };
};

export { createSwitchCommand };
