import { StampCommand, createStampCommand } from './stamp-command';
import { SwitchCommand, createSwitchCommand } from './switch-command';
import {
  SwitchFetchCommand, createSwitchFetchCommand
} from './switch-fetch-command';
import { UpdateCommand, createUpdateCommand } from './update-command';
import { UpdatedEvent, createUpdatedEvent } from './updated-event';

export type Message =
  StampCommand |
  SwitchCommand |
  SwitchFetchCommand |
  UpdateCommand |
  UpdatedEvent;

export {
  createStampCommand,
  createSwitchCommand,
  createSwitchFetchCommand,
  createUpdateCommand,
  createUpdatedEvent
};
