import React from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { useDeadlineCardContext } from './DeadlineCardContext';

export const DeadlineCardActions: React.FC = () => {
  const { assignment, onToggleComplete, onDelete, onEdit } = useDeadlineCardContext();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: '8px',
        borderTop: '1px dashed var(--ant-color-border-secondary, #f0f0f0)',
      }}
    >
      <Space size={6}>
        <Tooltip title={assignment.completed ? 'Bỏ đánh dấu hoàn thành' : 'Đánh dấu đã hoàn thành'}>
          <Button
            size="small"
            type={assignment.completed ? 'default' : 'primary'}
            icon={assignment.completed ? <RollbackOutlined /> : <CheckOutlined />}
            onClick={() => onToggleComplete(assignment.id, assignment.completed)}
            style={{
              borderRadius: '6px',
              fontSize: '12px',
              ...(assignment.completed
                ? {}
                : {
                    background: '#13c2c2',
                    borderColor: '#13c2c2',
                  }),
            }}
          >
            {assignment.completed ? 'Hoàn tác' : 'Xong'}
          </Button>
        </Tooltip>

        {onEdit && (
          <Tooltip title="Chỉnh sửa bài tập">
            <Button
              size="small"
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(assignment)}
              style={{ borderRadius: '6px' }}
            />
          </Tooltip>
        )}

        <Popconfirm
          title="Xoá bài tập"
          description={`Bạn có chắc chắn muốn xoá bài tập "${assignment.title}"?`}
          onConfirm={() => onDelete(assignment.id)}
          okText="Xoá"
          cancelText="Huỷ"
          okButtonProps={{ danger: true, size: 'small' }}
          cancelButtonProps={{ size: 'small' }}
          placement="topRight"
        >
          <Tooltip title="Xoá bài tập">
            <Button
              size="small"
              danger
              type="text"
              icon={<DeleteOutlined />}
              style={{ borderRadius: '6px' }}
            />
          </Tooltip>
        </Popconfirm>
      </Space>
    </div>
  );
};
