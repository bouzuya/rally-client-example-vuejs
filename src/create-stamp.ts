import { RallyClient } from 'rally-client';

const createStamp = (
  client: RallyClient,
  stampCardId: number,
  spotId: number,
  lat: number,
  lng: number
): Promise<void> => {
  return client.call({
    method: 'POST',
    path: '/stamps',
    body: {
      lat,
      lng,
      spotId,
      stampCardId,
      stampType: 'location'
    }
  });
};

export { createStamp };
