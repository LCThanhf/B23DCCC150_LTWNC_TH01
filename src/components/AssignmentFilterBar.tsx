import React from 'react';
import { Badge, Card, Col, Input, Radio, Row, Select, Space } from 'antd';
import {
  FilterOutlined,
  SearchOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import type { FilterStatsMap, FilterStatus, SortByOption, SortDirection } from '../types/assignment';

interface AssignmentFilterBarProps {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  stats: FilterStatsMap;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableSubjects: string[];
  selectedSubject: string | null;
  onSubjectChange: (subject: string | null) => void;
  sortBy: SortByOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortByOption, direction: SortDirection) => void;
}

export const AssignmentFilterBar: React.FC<AssignmentFilterBarProps> = ({
  filterStatus,
  onFilterChange,
  stats,
  searchQuery,
  onSearchChange,
  availableSubjects,
  selectedSubject,
  onSubjectChange,
  sortBy,
  sortDirection,
  onSortChange,
}) => {
  // Sort composite key
  const currentSortKey = `${sortBy}_${sortDirection}`;

  const handleSortSelect = (value: string) => {
    const [field, direction] = value.split('_') as [SortByOption, SortDirection];
    onSortChange(field, direction);
  };

  return (
    <Card
      style={{
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
      styles={{ body: { padding: '16px' } }}
    >
      <Row gutter={[16, 16]} align="middle">
        {/* Bộ lọc trạng thái (Yêu cầu 5) */}
        <Col xs={24} lg={14}>
          <Radio.Group
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value as FilterStatus)}
            buttonStyle="solid"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
          >
            <Radio.Button value="ALL" style={{ borderRadius: '6px' }}>
              <Space orientation="horizontal" size={6}>
                <span>Tất cả</span>
                <Badge count={stats.ALL} overflowCount={99} style={{ backgroundColor: '#1677ff' }} />
              </Space>
            </Radio.Button>

            <Radio.Button value="PENDING" style={{ borderRadius: '6px' }}>
              <Space orientation="horizontal" size={6}>
                <span>Chưa hoàn thành</span>
                <Badge count={stats.PENDING} overflowCount={99} style={{ backgroundColor: '#faad14' }} />
              </Space>
            </Radio.Button>

            <Radio.Button value="OVERDUE" style={{ borderRadius: '6px' }}>
              <Space orientation="horizontal" size={6}>
                <span>Quá hạn</span>
                <Badge count={stats.OVERDUE} overflowCount={99} style={{ backgroundColor: '#ff4d4f' }} />
              </Space>
            </Radio.Button>

            <Radio.Button value="COMPLETED" style={{ borderRadius: '6px' }}>
              <Space orientation="horizontal" size={6}>
                <span>Đã hoàn thành</span>
                <Badge count={stats.COMPLETED} overflowCount={99} style={{ backgroundColor: '#52c41a' }} />
              </Space>
            </Radio.Button>
          </Radio.Group>
        </Col>

        {/* Thanh tìm kiếm & bộ lọc bổ sung */}
        <Col xs={24} lg={10}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12}>
              <Input
                placeholder="Tìm bài tập hoặc môn học..."
                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                allowClear
                style={{ borderRadius: '6px' }}
              />
            </Col>

            <Col xs={12} sm={6}>
              <Select
                placeholder="Môn học"
                value={selectedSubject}
                onChange={onSubjectChange}
                allowClear
                style={{ width: '100%' }}
                suffixIcon={<FilterOutlined />}
                options={[
                  { label: 'Tất cả môn', value: null },
                  ...availableSubjects.map((s) => ({ label: s, value: s })),
                ]}
              />
            </Col>

            <Col xs={12} sm={6}>
              <Select
                value={currentSortKey}
                onChange={handleSortSelect}
                style={{ width: '100%' }}
                suffixIcon={<SortAscendingOutlined />}
                options={[
                  { label: 'Hạn nộp gần nhất', value: 'dueDate_asc' },
                  { label: 'Hạn nộp xa nhất', value: 'dueDate_desc' },
                  { label: 'Ưu tiên cao nhất', value: 'priority_desc' },
                  { label: 'Ưu tiên thấp nhất', value: 'priority_asc' },
                  { label: 'Tên bài tập (A-Z)', value: 'title_asc' },
                ]}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
