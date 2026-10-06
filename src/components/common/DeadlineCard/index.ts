import { DeadlineCardRoot } from './DeadlineCard';
import { DeadlineCardHeader } from './DeadlineCardHeader';
import { DeadlineCardTitle } from './DeadlineCardTitle';
import { DeadlineCardCountdown } from './DeadlineCardCountdown';
import { DeadlineCardMeta } from './DeadlineCardMeta';
import { DeadlineCardActions } from './DeadlineCardActions';

/**
 * ============================================================================
 * BUỔI 2: COMPOUND COMPONENT EXPORT
 * ============================================================================
 * Cho phép sử dụng cú pháp Compound Component trực quan:
 * <DeadlineCard assignment={item} onToggleComplete={...} onDelete={...}>
 *   <DeadlineCard.Header />
 *   <DeadlineCard.Title />
 *   <DeadlineCard.Countdown />
 *   <DeadlineCard.Meta />
 *   <DeadlineCard.Actions />
 * </DeadlineCard>
 */
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
