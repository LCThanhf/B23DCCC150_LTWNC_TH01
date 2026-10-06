import { useMemo } from 'react';
import type {
  Assignment,
  FilterStatsMap,
  FilterStatus,
  PriorityLevel,
  SortByOption,
  SortDirection,
} from '../types/assignment';
import { isAssignmentOverdue, sortByGeneric } from '../utils/typeGuards';
import { PRIORITY_CONFIG } from '../utils/dateUtils';
import dayjs from 'dayjs';

interface UseAssignmentFilterProps {
  assignments: Assignment[];
  filterStatus: FilterStatus;
  searchQuery: string;
  selectedSubject: string | null;
  sortBy: SortByOption;
  sortDirection: SortDirection;
}

export function useAssignmentFilter({
  assignments,
  filterStatus,
  searchQuery,
  selectedSubject,
  sortBy,
  sortDirection,
}: UseAssignmentFilterProps) {
  const stats: FilterStatsMap = useMemo(() => {
    let pending = 0;
    let overdue = 0;
    let completed = 0;

    for (const item of assignments) {
      if (item.completed) {
        completed++;
      } else if (isAssignmentOverdue(item)) {
        overdue++;
      } else {
        pending++;
      }
    }

    return {
      ALL: assignments.length,
      PENDING: pending,
      OVERDUE: overdue,
      COMPLETED: completed,
    };
  }, [assignments]);

  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    assignments.forEach((a) => {
      if (a.subject.trim()) {
        set.add(a.subject.trim());
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'vi'));
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    return assignments
      .filter((item) => {
        switch (filterStatus) {
          case 'PENDING':
            if (item.completed || isAssignmentOverdue(item)) return false;
            break;
          case 'OVERDUE':
            if (!isAssignmentOverdue(item)) return false;
            break;
          case 'COMPLETED':
            if (!item.completed) return false;
            break;
          case 'ALL':
          default:
            break;
        }

        if (selectedSubject && item.subject !== selectedSubject) {
          return false;
        }

        if (searchQuery.trim()) {
          const query = searchQuery.trim().toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchSubject = item.subject.toLowerCase().includes(query);
          const matchDesc = item.description?.toLowerCase().includes(query) ?? false;
          if (!matchTitle && !matchSubject && !matchDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const weightA = PRIORITY_CONFIG[a.priority as PriorityLevel]?.weight ?? 0;
          const weightB = PRIORITY_CONFIG[b.priority as PriorityLevel]?.weight ?? 0;
          return sortDirection === 'asc' ? weightA - weightB : weightB - weightA;
        }

        if (sortBy === 'dueDate') {
          const timeA = dayjs(a.dueDate).valueOf();
          const timeB = dayjs(b.dueDate).valueOf();
          return sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
        }

        return sortByGeneric([a, b], sortBy, sortDirection)[0] === a ? -1 : 1;
      });
  }, [assignments, filterStatus, selectedSubject, searchQuery, sortBy, sortDirection]);

  return {
    filteredAssignments,
    stats,
    availableSubjects,
    totalCount: assignments.length,
    filteredCount: filteredAssignments.length,
  };
}
