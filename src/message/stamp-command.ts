export interface StampCommand {
  type: 'stamp';
  spotId: number;
}

const createStampCommand = (spotId: number): StampCommand => {
  return { type: 'stamp', spotId };
};

export { createStampCommand };
