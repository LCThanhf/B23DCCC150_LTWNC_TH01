import React from 'react';
import { Button, Space, Tooltip, Typography } from 'antd';
import {
  CheckSquareFilled,
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
          <Title level={4} style={{ margin: 0, letterSpacing: '-0.3px' }}>
            Student Deadline Tracker
          </Title>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Quản lý deadline bài tập & tiến độ học tập cá nhân
          </Text>
        </div>
      </div>

      <Space size={10} wrap>
        <Tooltip title={isDarkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}>
          <Button
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={onToggleTheme}
            shape="circle"
          />
        </Tooltip>

        <Tooltip title="Tải lại danh sách dữ liệu mẫu từ API giả lập">
          <Button
            icon={<ReloadOutlined />}
            onClick={onResetMockData}
            loading={resetLoading}
          >
            Dữ liệu mẫu
          </Button>
        </Tooltip>

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
