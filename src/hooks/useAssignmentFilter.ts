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

/**
 * ============================================================================
 * BUỔI 2: CUSTOM HOOK NÂNG CAO — useAssignmentFilter
 * ============================================================================
 * Quản lý logic lọc phức tạp:
 * 1. Lọc theo trạng thái: Tất cả / Chưa hoàn thành / Quá hạn / Đã hoàn thành (Yêu cầu 5)
 * 2. Tìm kiếm theo tiêu đề bài tập hoặc tên môn học
 * 3. Lọc theo môn học cụ thể
 * 4. Sắp xếp theo hạn nộp, mức độ ưu tiên, môn học hoặc tiêu đề
 * 5. Tính toán các chỉ số thống kê (Stats: Total, Pending, Overdue, Completed)
 */
export function useAssignmentFilter({
  assignments,
  filterStatus,
  searchQuery,
  selectedSubject,
  sortBy,
  sortDirection,
}: UseAssignmentFilterProps) {
  // 1. Thống kê số lượng theo từng trạng thái (Sử dụng FilterStatsMap)
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

  // 2. Danh sách tất cả môn học duy nhất (cho bộ lọc môn học)
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    assignments.forEach((a) => {
      if (a.subject.trim()) {
        set.add(a.subject.trim());
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'vi'));
  }, [assignments]);

  // 3. Tiến hành lọc & sắp xếp
  const filteredAssignments = useMemo(() => {
    return assignments
      .filter((item) => {
        // Lọc theo trạng thái (Yêu cầu 5)
        switch (filterStatus) {
          case 'PENDING':
            // Chưa hoàn thành & chưa quá hạn
            if (item.completed || isAssignmentOverdue(item)) return false;
            break;
          case 'OVERDUE':
            // Quá hạn
            if (!isAssignmentOverdue(item)) return false;
            break;
          case 'COMPLETED':
            // Đã hoàn thành
            if (!item.completed) return false;
            break;
          case 'ALL':
          default:
            break;
        }

        // Lọc theo môn học
        if (selectedSubject && item.subject !== selectedSubject) {
          return false;
        }

        // Lọc theo từ khoá tìm kiếm
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
        // Xử lý sắp xếp tuỳ chỉnh theo các trường
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

        // Sắp xếp Generic theo title hoặc subject
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
