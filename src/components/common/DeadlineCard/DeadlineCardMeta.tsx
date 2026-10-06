import React from 'react';
import { Space, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useDeadlineCardContext } from './DeadlineCardContext';
import { formatDisplayDate } from '../../../utils/dateUtils';

const { Text, Paragraph } = Typography;

export const DeadlineCardMeta: React.FC = () => {
  const { assignment } = useDeadlineCardContext();

  return (
    <div style={{ marginTop: '8px', marginBottom: '12px' }}>
      <Space orientation="horizontal" size={6} style={{ color: 'var(--ant-color-text-secondary)', fontSize: '13px' }}>
        <CalendarOutlined />
        <Text type="secondary" style={{ fontSize: '12px' }}>
          Hạn nộp: <strong style={{ color: 'var(--ant-color-text)' }}>{formatDisplayDate(assignment.dueDate)}</strong>
        </Text>
      </Space>

      {assignment.description && (
        <Paragraph
          ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
          type="secondary"
          style={{
            fontSize: '12px',
            marginTop: '6px',
            marginBottom: '4px',
            lineHeight: 1.5,
          }}
        >
          {assignment.description}
        </Paragraph>
      )}
    </div>
  );
};
