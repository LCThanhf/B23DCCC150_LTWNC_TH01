import type { Assignment, PriorityLevel, SortDirection } from '../types/assignment';
import dayjs from 'dayjs';

export function isPriority(value: unknown): value is PriorityLevel {
  return typeof value === 'string' && ['HIGH', 'MEDIUM', 'LOW'].includes(value);
}

export function isAssignment(obj: unknown): obj is Assignment {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const candidate = obj as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.subject === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.dueDate === 'string' &&
    isPriority(candidate.priority) &&
    typeof candidate.completed === 'boolean'
  );
}

export function isValidDateString(val: unknown): val is string {
  if (typeof val !== 'string') return false;
  return dayjs(val).isValid();
}

export function isAssignmentOverdue(
  assignment: Assignment,
  referenceDate: string = dayjs().format('YYYY-MM-DD')
): boolean {
  if (assignment.completed) return false;
  const target = dayjs(assignment.dueDate).startOf('day');
  const today = dayjs(referenceDate).startOf('day');
  return target.isBefore(today);
}

export function isNonNullable<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function sortByGeneric<T, K extends keyof T>(
  items: T[],
  key: K,
  direction: SortDirection = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA === valB) return 0;
    if (valA === undefined || valA === null) return 1;
    if (valB === undefined || valB === null) return -1;

    let comparison = 0;
    if (typeof valA === 'string' && typeof valB === 'string') {
      comparison = valA.localeCompare(valB, 'vi', { sensitivity: 'base' });
    } else if (typeof valA === 'number' && typeof valB === 'number') {
      comparison = valA - valB;
    } else {
      comparison = String(valA) > String(valB) ? 1 : -1;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}
