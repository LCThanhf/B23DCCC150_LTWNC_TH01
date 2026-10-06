import React from 'react';
import { Button, Card, Col, Empty, Row, Skeleton, Typography } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import type { Assignment } from '../types/assignment';
import { DeadlineCard } from './common/DeadlineCard';
import { withUrgencyHighlight } from './hoc/withUrgencyHighlight';

const { Text } = Typography;

const HighlightedDeadlineCard = withUrgencyHighlight(DeadlineCard);

interface AssignmentListProps {
  assignments: Assignment[];
  loading: boolean;
  onToggleComplete: (id: string, currentCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
  onAddNew: () => void;
  onResetFilter: () => void;
}

export const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  loading,
  onToggleComplete,
  onDelete,
  onEdit,
  onAddNew,
  onResetFilter,
}) => {
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <Col xs={24} sm={12} lg={8} key={key}>
            <Card style={{ borderRadius: '10px' }}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  if (assignments.length === 0) {
    return (
      <Card
        style={{
          borderRadius: '10px',
          textAlign: 'center',
          padding: '40px 20px',
          marginTop: '16px',
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span style={{ fontSize: '15px', color: 'var(--ant-color-text-secondary)' }}>
              Không có bài tập nào phù hợp với bộ lọc hiện tại.
            </span>
          }
        >
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
            <Button icon={<ReloadOutlined />} onClick={onResetFilter}>
              Xem tất cả bài tập
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddNew}>
              Thêm bài tập mới
            </Button>
          </div>
        </Empty>
      </Card>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <Text type="secondary" style={{ fontSize: '13px' }}>
          Hiển thị <strong>{assignments.length}</strong> bài tập
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {assignments.map((assignment) => (
          <Col xs={24} sm={12} lg={8} key={assignment.id}>
            <HighlightedDeadlineCard
              assignment={assignment}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            >
              <div>
                <DeadlineCard.Header />
                <DeadlineCard.Title />
                <div style={{ marginBottom: '10px' }}>
                  <DeadlineCard.Countdown />
                </div>
                <DeadlineCard.Meta />
              </div>
              <DeadlineCard.Actions />
            </HighlightedDeadlineCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};
