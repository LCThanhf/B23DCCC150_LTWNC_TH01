import { useMemo } from 'react';
import type { DeadlineInfo } from '../types/assignment';
import { calculateDeadlineInfo, formatDisplayDate } from '../utils/dateUtils';

/**
 * ============================================================================
 * BUỔI 2: CUSTOM HOOK NÂNG CAO — useDeadlineCountdown
 * ============================================================================
 * Hook chuyên biệt tính toán hạn nộp, xác định xem bài tập:
 * - "Còn X ngày"
 * - "Quá hạn Y ngày"
 * - "Hạn chót hôm nay"
 * - "Đã hoàn thành"
 * Cung cấp thông tin trực quan cho Ant Design tags và badges.
 */
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
