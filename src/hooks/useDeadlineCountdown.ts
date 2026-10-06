import { useMemo } from 'react';
import type { DeadlineInfo } from '../types/assignment';
import { calculateDeadlineInfo, formatDisplayDate } from '../utils/dateUtils';

export function useDeadlineCountdown(dueDate: string, completed: boolean = false) {
  const deadlineInfo: DeadlineInfo = useMemo(() => {
    return calculateDeadlineInfo(dueDate, completed);
  }, [dueDate, completed]);

  const formattedDueDate = useMemo(() => {
    return formatDisplayDate(dueDate);
  }, [dueDate]);

  const isUrgent = useMemo(() => {
    return !completed && (deadlineInfo.urgency === 'OVERDUE' || deadlineInfo.urgency === 'DUE_TODAY');
  }, [completed, deadlineInfo.urgency]);

  return {
    ...deadlineInfo,
    formattedDueDate,
    isUrgent,
  };
}
