import { create as createRallyClient, RallyClient } from 'rally-client';
import { createStamp } from '../create-stamp';
import { getLocation } from '../get-location';
import { ensureStampCard, StampCard } from '../ensure-stamp-card';
import { ensureUser } from '../ensure-user';
import {
  Message,
  createSwitchFetchCommand,
  createUpdateCommand,
  createUpdatedEvent
} from '../message';
import { MessageBus, Unsubscribe } from '../message-bus';
import { StampRally } from '../types/stamp-rally';

interface ApiSpot {
  id: number;
  name: string;
  tagline: string | null;
  description: string | null;
  images: { s640: string; }[];
  lat: string;
  lng: string;
  stampByLocation: boolean;
}

interface ApiStampRally {
  name: string;
  displayName: string;
  tagline: string | null;
  description: string | null;
  spots: ApiSpot[];
  images: { s640: string; }[];
}

const getStampRally = (
  client: RallyClient, stampRallyId: string
): Promise<StampRally> => {
  return client.call({
    method: 'GET',
    path: `/rallies/${stampRallyId}`
  }).then((rally: ApiStampRally) => {
    const id = rally.name;
    const name = rally.displayName;
    const taglineHtml = rally.tagline;
    const descriptionHtml = rally.description;
    const spots = rally.spots;
    const image = rally.images.length > 0 ? rally.images[0].s640 : null;
    return {
      id,
      name,
      tagline: taglineHtml === null ? '' : taglineHtml,
      description: descriptionHtml === null ? '' : descriptionHtml,
      image,
      spots: spots.map((spot) => {
        const id = spot.id;
        const name = spot.name;
        const taglineHtml = spot.tagline;
        const descriptionHtml = spot.description;
        const image = spot.images.length > 0 ? spot.images[0].s640 : null;
        const lat = +spot.lat;
        const lng = +spot.lng;
        const stampByLocation = spot.stampByLocation;
        return {
          id,
          name,
          tagline: taglineHtml === null ? '' : taglineHtml,
          description: descriptionHtml === null ? '' : descriptionHtml,
          image,
          lat,
          lng,
          stampByLocation
        };
      })
    };
  });
};

const getStampCard = (
  client: RallyClient, stampRallyId: string
): Promise<StampCard> => {
  return ensureUser(client).then((user) => {
    return ensureStampCard(client, stampRallyId, user.id);
  });
};

const doStampCommand = (getState: () => State, spotId: number): Promise<Message> => {
  const state = getState();
  return Promise.all([
    getStampCard(state.client, state.stampRallyId),
    getLocation()
  ])
    .then(([stampCard, { lat, lng }]) => {
      const state = getState();
      return createStamp(state.client, stampCard.id, spotId, lat, lng);
    })
    .then(() => {
      // reload stamp card
      const state = getState();
      return getStampCard(state.client, state.stampRallyId);
    })
    .then((stampCard) => {
      return createUpdateCommand({ stampCard });
    });
};

const doSwitchCommand = (
  _getState: () => State, stampRallyId: string
): Promise<Message> => {
  return Promise.resolve(createUpdateCommand(
    { stampCard: null, stampRally: null, stampRallyId },
    createSwitchFetchCommand()
  ));
};

const doSwitchFetchCommand = (getState: () => State): Promise<Message> => {
  const state = getState();
  return Promise.all([
    getStampCard(state.client, state.stampRallyId),
    getStampRally(state.client, state.stampRallyId)
  ])
    .then(([stampCard, stampRally]) => {
      return createUpdateCommand({ stampCard, stampRally });
    });
};

interface State {
  client: RallyClient;
  stampCard: StampCard | null;
  stampRally: StampRally | null;
  stampRallyId: string;
};

const attach = (bus: MessageBus): Unsubscribe => {
  let state: State = {
    client: createRallyClient(),
    stampCard: null,
    stampRally: null,
    stampRallyId: 'bouzuya'
  };
  const getState = (): State => state;
  const next = (message: Message | undefined): void => {
    if (typeof message !== 'undefined') {
      bus.publish(message);
    }
  };
  return bus.subscribe((message: Message) => {
    if (message.type === 'stamp') {
      doStampCommand(getState, message.spotId).then(next);
    } else if (message.type === 'switch') {
      doSwitchCommand(getState, message.stampRallyId).then(next);
    } else if (message.type === 'switch-fetch') {
      doSwitchFetchCommand(getState).then(next);
    } else if (message.type === 'update') {
      state = Object.assign({}, state, message.state);
      bus.publish(createUpdatedEvent(state));
      if (message.next !== null) {
        bus.publish(message.next);
      }
    }
  });
};

export { attach };
