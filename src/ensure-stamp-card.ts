import { RallyClient } from 'rally-client';

type StampCard = any;

const getStampCards = (
  client: RallyClient,
  stampRallyId: string,
  userId: string
): Promise<{ stampCards: StampCard[] }> => {
  return client.call({
    method: 'GET',
    path: '/stamp_cards',
    query: {
      stampRallyId,
      userId
    }
  });
};

const createStampCard = (
  client: RallyClient,
  stampRallyId: string,
  userId: string
): Promise<StampCard> => {
  return client.call({
    method: 'POST',
    path: '/stamp_cards',
    body: {
      stampRallyId,
      userId
    }
  });
};

const getStampCard = (
  client: RallyClient,
  stampCardId: string
): Promise<StampCard> => {
  return client.call({
    method: 'GET',
    path: `/stamp_cards/${stampCardId}`
  });
};

const ensureStampCard = (
  client: RallyClient,
  stampRallyId: string,
  userId: string
): Promise<StampCard> => {
  return getStampCards(client, stampRallyId, userId).then(({ stampCards }) => {
    if (stampCards.length === 0) {
      return createStampCard(client, stampRallyId, userId);
    } else {
      return getStampCard(client, String(stampCards[0].id));
    }
  });
};

export { ensureStampCard, StampCard };
