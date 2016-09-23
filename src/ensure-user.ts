import { RallyClient, User } from 'rally-client';

const ensureUser = (client: RallyClient): Promise<User> => {
  return client.user();
};

export { ensureUser };
