import React from 'react';
import { Space, Tag } from 'antd';
import { BookOutlined, FlagFilled } from '@ant-design/icons';
import { useDeadlineCardContext } from './DeadlineCardContext';
import { PRIORITY_CONFIG } from '../../../utils/dateUtils';
import type { PriorityLevel } from '../../../types/assignment';

export const DeadlineCardHeader: React.FC = () => {
  const { assignment } = useDeadlineCardContext();
  const priorityConfig = PRIORITY_CONFIG[assignment.priority as PriorityLevel] ?? PRIORITY_CONFIG.MEDIUM;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '10px',
      }}
    >
      <Tag
        color="blue"
        icon={<BookOutlined />}
        style={{
          fontSize: '12px',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: '4px',
          margin: 0,
        }}
      >
        {assignment.subject}
      </Tag>

      <Space size={4}>
        <Tag
          color={priorityConfig.tagColor}
          icon={<FlagFilled />}
          style={{
            fontWeight: 500,
            borderRadius: '4px',
            margin: 0,
          }}
        >
          {priorityConfig.label}
        </Tag>
      </Space>
    </div>
  );
};
