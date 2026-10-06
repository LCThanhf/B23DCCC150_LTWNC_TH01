export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type FilterStatus = 'ALL' | 'PENDING' | 'OVERDUE' | 'COMPLETED';

export type SortByOption = 'dueDate' | 'priority' | 'title' | 'subject';

export type SortDirection = 'asc' | 'desc';

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  priority: PriorityLevel;
  completed: boolean;
  createdAt: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  statusCode: number;
}

export interface FilterCriteria<T> {
  predicate: (item: T) => boolean;
  label: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type CreateAssignmentDTO = Omit<Assignment, 'id' | 'createdAt'>;

export type UpdateAssignmentDTO = Pick<Assignment, 'id'> & Partial<Omit<Assignment, 'id' | 'createdAt'>>;

export type AssignmentSummary = Pick<Assignment, 'id' | 'title' | 'subject' | 'dueDate' | 'priority' | 'completed'>;

export interface PriorityConfig {
  label: string;
  color: string;
  tagColor: string;
  weight: number;
}

export type PriorityConfigMap = Record<PriorityLevel, PriorityConfig>;

export type FilterStatsMap = Record<FilterStatus, number>;

export type DeadlineUrgency = 'OVERDUE' | 'DUE_TODAY' | 'DUE_SOON' | 'UPCOMING' | 'COMPLETED';

export interface DeadlineInfo {
  daysDiff: number;
  urgency: DeadlineUrgency;
  displayText: string;
  tagColor: string;
  badgeStatus: 'error' | 'warning' | 'processing' | 'default' | 'success';
}
