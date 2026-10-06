import React from 'react';
import { Button, Popover, Space, Tag, Tooltip, Typography } from 'antd';
import {
  CheckSquareFilled,
  InfoCircleOutlined,
  MoonOutlined,
  PlusOutlined,
  ReloadOutlined,
  SunOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface HeaderNavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenCreate: () => void;
  onResetMockData: () => void;
  resetLoading: boolean;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  onOpenCreate,
  onResetMockData,
  resetLoading,
}) => {
  const projectInfoContent = (
    <div style={{ maxWidth: '340px' }}>
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
        📚 Student Deadline Tracker
      </Typography.Title>
      <p style={{ fontSize: '13px', margin: '4px 0' }}>
        <strong>Buổi 1 — TypeScript nâng cao:</strong> Generics (<code>ApiResponse&lt;T&gt;</code>, <code>sortByGeneric</code>), Utility Types (<code>Omit</code>, <code>Pick</code>, <code>Partial</code>, <code>Record</code>), Type Guards (<code>isAssignment</code>, <code>isPriority</code>, <code>isAssignmentOverdue</code>).
      </p>
      <p style={{ fontSize: '13px', margin: '4px 0' }}>
        <strong>Buổi 2 — React Design Patterns:</strong> Custom hooks nâng cao (<code>useDeadlineCountdown</code>, <code>useAssignmentFilter</code>), Compound Component (<code>DeadlineCard</code> với các sub-components Header, Title, Countdown, Meta, Actions) & HOC (<code>withUrgencyHighlight</code>).
      </p>
      <p style={{ fontSize: '13px', margin: '4px 0' }}>
        <strong>Buổi 3 — Redux Toolkit:</strong> Feature-based architecture, Typed Hooks (<code>useAppDispatch</code>, <code>useAppSelector</code>), <code>createAsyncThunk</code> xử lý bất đồng bộ từ Mock API giả lập.
      </p>
    </div>
  );

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: isDarkMode ? '#141414' : '#ffffff',
        borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Brand logo & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1677ff 0%, #13c2c2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '22px',
            boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)',
          }}
        >
          <CheckSquareFilled />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Title level={4} style={{ margin: 0, letterSpacing: '-0.3px' }}>
              Student Deadline Tracker
            </Title>
            <Tag color="cyan" style={{ borderRadius: '4px', margin: 0, fontSize: '11px' }}>
              LTWNC
            </Tag>
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Quản lý deadline bài tập & tiến độ học tập cá nhân
          </Text>
        </div>
      </div>

      {/* Actions */}
      <Space size={10} wrap>
        {/* Nút xem thông tin đồ án */}
        <Popover content={projectInfoContent} title="Thông tin kiến trúc ứng dụng" trigger="hover">
          <Button icon={<InfoCircleOutlined />} type="text" shape="circle" />
        </Popover>

        {/* Nút Đổi giao diện Dark / Light */}
        <Tooltip title={isDarkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}>
          <Button
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={onToggleTheme}
            shape="circle"
          />
        </Tooltip>

        {/* Nút Khôi phục dữ liệu mẫu */}
        <Tooltip title="Tải lại danh sách dữ liệu mẫu từ API giả lập">
          <Button
            icon={<ReloadOutlined />}
            onClick={onResetMockData}
            loading={resetLoading}
          >
            Dữ liệu mẫu
          </Button>
        </Tooltip>

        {/* Nút Thêm bài tập mới (Yêu cầu 2) */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onOpenCreate}
          style={{
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(22, 119, 255, 0.25)',
          }}
        >
          Thêm bài tập mới
        </Button>
      </Space>
    </header>
  );
};
