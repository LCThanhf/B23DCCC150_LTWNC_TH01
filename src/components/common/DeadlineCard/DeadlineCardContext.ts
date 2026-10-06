import { createContext, useContext } from 'react';
import type { Assignment, DeadlineInfo } from '../../../types/assignment';

export interface DeadlineCardContextValue {
  assignment: Assignment;
  deadlineInfo: DeadlineInfo;
  onToggleComplete: (id: string, currentCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onEdit?: (assignment: Assignment) => void;
}

export const DeadlineCardContext = createContext<DeadlineCardContextValue | null>(null);

export function useDeadlineCardContext(): DeadlineCardContextValue {
  const context = useContext(DeadlineCardContext);
  if (!context) {
    throw new Error('DeadlineCard sub-components must be wrapped within a <DeadlineCard>');
  }
  return context;
}
