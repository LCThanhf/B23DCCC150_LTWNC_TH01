import React from 'react';
import { Badge, Tag } from 'antd';
import {
  AlertFilled,
  CheckCircleFilled,
  ClockCircleFilled,
  FireFilled,
} from '@ant-design/icons';
import { useDeadlineCardContext } from './DeadlineCardContext';

export const DeadlineCardCountdown: React.FC = () => {
  const { deadlineInfo, assignment } = useDeadlineCardContext();

  const getIcon = () => {
    if (assignment.completed) {
      return <CheckCircleFilled />;
    }
    switch (deadlineInfo.urgency) {
      case 'OVERDUE':
        return <AlertFilled />;
      case 'DUE_TODAY':
        return <FireFilled />;
      case 'DUE_SOON':
        return <ClockCircleFilled />;
      default:
        return <ClockCircleFilled />;
    }
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Badge
        status={deadlineInfo.badgeStatus}
        style={{ marginRight: 6 }}
      />
      <Tag
        color={deadlineInfo.tagColor}
        icon={getIcon()}
        style={{
          fontWeight: 600,
          fontSize: '12px',
          padding: '2px 10px',
          borderRadius: '12px',
          margin: 0,
        }}
      >
        {deadlineInfo.displayText}
      </Tag>
    </div>
  );
};
