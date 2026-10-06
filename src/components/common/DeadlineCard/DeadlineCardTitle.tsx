import React from 'react';
import { Checkbox, Typography } from 'antd';
import { useDeadlineCardContext } from './DeadlineCardContext';

const { Text } = Typography;

export const DeadlineCardTitle: React.FC = () => {
  const { assignment, onToggleComplete } = useDeadlineCardContext();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '10px',
      }}
    >
      <Checkbox
        checked={assignment.completed}
        onChange={() => onToggleComplete(assignment.id, assignment.completed)}
        style={{ marginTop: '3px' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          strong
          delete={assignment.completed}
          style={{
            fontSize: '15px',
            lineHeight: 1.4,
            display: 'block',
            color: assignment.completed ? 'var(--ant-color-text-secondary)' : undefined,
            transition: 'all 0.2s ease',
          }}
        >
          {assignment.title}
        </Text>
      </div>
    </div>
  );
};
