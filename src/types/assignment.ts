/**
 * ============================================================================
 * BUỔI 1: TYPESCRIPT NÂNG CAO (GENERIC, UTILITY TYPES, TYPE GUARD)
 * ============================================================================
 */

// --- 1. Union Types & Base Entities ---
export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type FilterStatus = 'ALL' | 'PENDING' | 'OVERDUE' | 'COMPLETED';

export type SortByOption = 'dueDate' | 'priority' | 'title' | 'subject';

export type SortDirection = 'asc' | 'desc';

/**
 * Base Assignment Interface
 */
export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string; // ISO format string: YYYY-MM-DD
  priority: PriorityLevel;
  completed: boolean;
  createdAt: string;
  description?: string;
}

// --- 2. Generic Types ---

/**
 * Generic API Response wrapper cho các yêu cầu mạng / mock API
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  statusCode: number;
}

/**
 * Generic Filter & Sort criteria type
 */
export interface FilterCriteria<T> {
  predicate: (item: T) => boolean;
  label: string;
}

/**
 * Generic Pagination Response
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// --- 3. Utility Types (Vận dụng các Utility Types có sẵn của TypeScript) ---

/**
 * DTO khi tạo bài tập mới: Sử dụng Omit để loại bỏ id và createdAt (sẽ do hệ thống sinh)
 */
export type CreateAssignmentDTO = Omit<Assignment, 'id' | 'createdAt'>;

/**
 * DTO khi cập nhật bài tập: Bắt buộc có 'id' (Pick), các trường còn lại tuỳ chọn (Partial)
 */
export type UpdateAssignmentDTO = Pick<Assignment, 'id'> & Partial<Omit<Assignment, 'id' | 'createdAt'>>;

/**
 * Tóm tắt bài tập hiển thị nhanh: Sử dụng Pick
 */
export type AssignmentSummary = Pick<Assignment, 'id' | 'title' | 'subject' | 'dueDate' | 'priority' | 'completed'>;

/**
 * Cấu hình hiển thị theo mức độ ưu tiên: Sử dụng Record
 */
export interface PriorityConfig {
  label: string;
  color: string;
  tagColor: string;
  weight: number;
}

export type PriorityConfigMap = Record<PriorityLevel, PriorityConfig>;

/**
 * Thống kê số lượng bài tập theo trạng thái: Sử dụng Record
 */
export type FilterStatsMap = Record<FilterStatus, number>;

/**
 * Trạng thái Deadline phân loại cho giao diện
 */
export type DeadlineUrgency = 'OVERDUE' | 'DUE_TODAY' | 'DUE_SOON' | 'UPCOMING' | 'COMPLETED';

export interface DeadlineInfo {
  daysDiff: number; // âm là quá hạn, 0 là hôm nay, dương là còn X ngày
  urgency: DeadlineUrgency;
  displayText: string; // "Quá hạn X ngày", "Hạn chót hôm nay", "Còn X ngày"
  tagColor: string;
  badgeStatus: 'error' | 'warning' | 'processing' | 'default' | 'success';
}
