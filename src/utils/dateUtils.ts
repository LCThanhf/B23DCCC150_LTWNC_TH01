import dayjs from 'dayjs';
import type { DeadlineInfo, PriorityConfigMap } from '../types/assignment';

export const PRIORITY_CONFIG: PriorityConfigMap = {
  HIGH: {
    label: 'Cao',
    color: '#ff4d4f',
    tagColor: 'error',
    weight: 3,
  },
  MEDIUM: {
    label: 'Trung bình',
    color: '#faad14',
    tagColor: 'warning',
    weight: 2,
  },
  LOW: {
    label: 'Thấp',
    color: '#52c41a',
    tagColor: 'success',
    weight: 1,
  },
};

export function calculateDeadlineInfo(dueDate: string, completed: boolean = false): DeadlineInfo {
  if (completed) {
    return {
      daysDiff: 0,
      urgency: 'COMPLETED',
      displayText: 'Đã hoàn thành',
      tagColor: 'success',
      badgeStatus: 'success',
    };
  }

  const today = dayjs().startOf('day');
  const due = dayjs(dueDate).startOf('day');
  const daysDiff = due.diff(today, 'day');

  if (daysDiff < 0) {
    const overdueDays = Math.abs(daysDiff);
    return {
      daysDiff,
      urgency: 'OVERDUE',
      displayText: `Quá hạn ${overdueDays} ngày`,
      tagColor: 'error',
      badgeStatus: 'error',
    };
  }

  if (daysDiff === 0) {
    return {
      daysDiff: 0,
      urgency: 'DUE_TODAY',
      displayText: 'Hạn chót hôm nay',
      tagColor: 'volcano',
      badgeStatus: 'warning',
    };
  }

  if (daysDiff === 1) {
    return {
      daysDiff: 1,
      urgency: 'DUE_SOON',
      displayText: 'Còn 1 ngày (Ngày mai)',
      tagColor: 'warning',
      badgeStatus: 'warning',
    };
  }

  if (daysDiff <= 3) {
    return {
      daysDiff,
      urgency: 'DUE_SOON',
      displayText: `Còn ${daysDiff} ngày`,
      tagColor: 'orange',
      badgeStatus: 'processing',
    };
  }

  return {
    daysDiff,
    urgency: 'UPCOMING',
    displayText: `Còn ${daysDiff} ngày`,
    tagColor: 'processing',
    badgeStatus: 'default',
  };
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  return dayjs(dateStr).format('DD/MM/YYYY');
}
