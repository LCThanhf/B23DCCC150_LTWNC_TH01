import React from 'react';
import { Card, Col, Progress, Row, Statistic } from 'antd';
import {
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import type { FilterStatsMap } from '../types/assignment';

interface DashboardStatsProps {
  stats: FilterStatsMap;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const completionRate = stats.ALL > 0 ? Math.round((stats.COMPLETED / stats.ALL) * 100) : 0;

  return (
    <div style={{ marginBottom: '24px' }}>
      <Row gutter={[16, 16]}>
        {/* Tổng số bài tập */}
        <Col xs={12} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              background: 'linear-gradient(135deg, rgba(22, 119, 255, 0.08) 0%, rgba(22, 119, 255, 0.02) 100%)',
              border: '1px solid rgba(22, 119, 255, 0.2)',
              borderRadius: '10px',
            }}
          >
            <Statistic
              title={<span style={{ fontWeight: 600 }}>Tổng bài tập</span>}
              value={stats.ALL}
              prefix={<UnorderedListOutlined style={{ color: '#1677ff', marginRight: 6 }} />}
              valueStyle={{ color: '#1677ff', fontWeight: 700 }}
            />
          </Card>
        </Col>

        {/* Đang làm (Chưa hoàn thành) */}
        <Col xs={12} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              background: 'linear-gradient(135deg, rgba(250, 173, 20, 0.08) 0%, rgba(250, 173, 20, 0.02) 100%)',
              border: '1px solid rgba(250, 173, 20, 0.2)',
              borderRadius: '10px',
            }}
          >
            <Statistic
              title={<span style={{ fontWeight: 600 }}>Chưa nộp</span>}
              value={stats.PENDING}
              prefix={<ClockCircleOutlined style={{ color: '#faad14', marginRight: 6 }} />}
              valueStyle={{ color: '#faad14', fontWeight: 700 }}
            />
          </Card>
        </Col>

        {/* Quá hạn */}
        <Col xs={12} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 77, 79, 0.08) 0%, rgba(255, 77, 79, 0.02) 100%)',
              border: '1px solid rgba(255, 77, 79, 0.2)',
              borderRadius: '10px',
            }}
          >
            <Statistic
              title={<span style={{ fontWeight: 600 }}>Quá hạn</span>}
              value={stats.OVERDUE}
              prefix={<AlertOutlined style={{ color: '#ff4d4f', marginRight: 6 }} />}
              valueStyle={{ color: '#ff4d4f', fontWeight: 700 }}
            />
          </Card>
        </Col>

        {/* Đã hoàn thành & Tỷ lệ */}
        <Col xs={12} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              background: 'linear-gradient(135deg, rgba(82, 196, 26, 0.08) 0%, rgba(82, 196, 26, 0.02) 100%)',
              border: '1px solid rgba(82, 196, 26, 0.2)',
              borderRadius: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Statistic
                title={<span style={{ fontWeight: 600 }}>Đã hoàn thành</span>}
                value={stats.COMPLETED}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a', marginRight: 6 }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 700 }}
              />
              <div style={{ textAlign: 'right' }}>
                <Progress
                  type="circle"
                  percent={completionRate}
                  size={46}
                  strokeColor={{ '0%': '#13c2c2', '100%': '#52c41a' }}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
