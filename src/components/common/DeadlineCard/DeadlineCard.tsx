import React from 'react';
import { Card } from 'antd';
import type { Assignment } from '../../../types/assignment';
import { DeadlineCardContext } from './DeadlineCardContext';
import { useDeadlineCountdown } from '../../../hooks/useDeadlineCountdown';

export interface DeadlineCardProps {
  assignment: Assignment;
  onToggleComplete: (id: string, currentCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onEdit?: (assignment: Assignment) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * ============================================================================
 * BUỔI 2: COMPOUND COMPONENT PATTERN — DeadlineCard (Root Component)
 * ============================================================================
 * Đóng vai trò Context Provider để chia sẻ trạng thái cho các sub-components:
 * - DeadlineCard.Header
 * - DeadlineCard.Title
 * - DeadlineCard.Countdown
 * - DeadlineCard.Meta
 * - DeadlineCard.Actions
 */
export const DeadlineCardRoot: React.FC<DeadlineCardProps> = ({
  assignment,
  onToggleComplete,
  onDelete,
  onEdit,
  children,
  style,
  className,
}) => {
  const deadlineInfo = useDeadlineCountdown(assignment.dueDate, assignment.completed);

  // Đường viền trái tạo điểm nhấn phân biệt trạng thái hạn nộp
  const getBorderLeftColor = () => {
    if (assignment.completed) return '#52c41a'; // Xanh lá
    switch (deadlineInfo.urgency) {
      case 'OVERDUE':
        return '#ff4d4f'; // Đỏ quá hạn
      case 'DUE_TODAY':
        return '#fa541c'; // Cam đậm hôm nay
      case 'DUE_SOON':
        return '#faad14'; // Vàng sắp đến hạn
      default:
        return '#1677ff'; // Xanh dương bình thường
    }
  };

  return (
    <DeadlineCardContext.Provider
      value={{
        assignment,
        deadlineInfo,
        onToggleComplete,
        onDelete,
        onEdit,
      }}
    >
      <Card
        className={`deadline-card ${assignment.completed ? 'completed' : ''} ${className ?? ''}`}
        hoverable
        style={{
          borderRadius: '10px',
          borderLeft: `4px solid ${getBorderLeftColor()}`,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: assignment.completed ? 0.75 : 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
        styles={{
          body: {
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
          },
        }}
      >
        {children}
      </Card>
    </DeadlineCardContext.Provider>
  );
};
