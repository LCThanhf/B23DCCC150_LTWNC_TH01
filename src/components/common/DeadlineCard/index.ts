import { DeadlineCardRoot } from './DeadlineCard';
import { DeadlineCardHeader } from './DeadlineCardHeader';
import { DeadlineCardTitle } from './DeadlineCardTitle';
import { DeadlineCardCountdown } from './DeadlineCardCountdown';
import { DeadlineCardMeta } from './DeadlineCardMeta';
import { DeadlineCardActions } from './DeadlineCardActions';

export const DeadlineCard = Object.assign(DeadlineCardRoot, {
  Header: DeadlineCardHeader,
  Title: DeadlineCardTitle,
  Countdown: DeadlineCardCountdown,
  Meta: DeadlineCardMeta,
  Actions: DeadlineCardActions,
});

export default DeadlineCard;
export * from './DeadlineCardContext';
export * from './DeadlineCard';
