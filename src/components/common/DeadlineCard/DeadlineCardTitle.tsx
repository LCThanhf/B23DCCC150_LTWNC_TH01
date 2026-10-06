import React from 'react';
import { Typography } from 'antd';
import { useDeadlineCardContext } from './DeadlineCardContext';

const { Text } = Typography;

export const DeadlineCardTitle: React.FC = () => {
  const { assignment } = useDeadlineCardContext();

  return (
    <div style={{ marginBottom: '10px' }}>
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
  );
};
