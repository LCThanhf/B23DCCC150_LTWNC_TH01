import React, { useEffect } from 'react';
import {
  AutoComplete,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Space,
} from 'antd';
import {
  BookOutlined,
  CalendarOutlined,
  EditOutlined,
  FlagFilled,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Assignment, CreateAssignmentDTO, PriorityLevel } from '../types/assignment';

interface AssignmentFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateAssignmentDTO) => Promise<void>;
  editingAssignment: Assignment | null;
  loading: boolean;
  availableSubjects: string[];
}

interface FormValues {
  subject: string;
  title: string;
  dueDate: dayjs.Dayjs;
  priority: PriorityLevel;
  description?: string;
}

export const AssignmentFormModal: React.FC<AssignmentFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingAssignment,
  loading,
  availableSubjects,
}) => {
  const [form] = Form.useForm<FormValues>();

  const isEditing = Boolean(editingAssignment);

  const defaultSubjects = [
    'Lập trình Web nâng cao',
    'Cơ sở dữ liệu phân tán',
    'Kiến trúc phần mềm',
    'Trí tuệ nhân tạo',
    'Phát triển ứng dụng di động',
    'Mạng máy tính nâng cao',
    'An toàn thông tin',
  ];

  const subjectOptions = Array.from(new Set([...defaultSubjects, ...availableSubjects])).map((s) => ({
    value: s,
  }));

  useEffect(() => {
    if (open) {
      if (editingAssignment) {
        form.setFieldsValue({
          subject: editingAssignment.subject,
          title: editingAssignment.title,
          dueDate: dayjs(editingAssignment.dueDate),
          priority: editingAssignment.priority,
          description: editingAssignment.description,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          priority: 'MEDIUM',
          dueDate: dayjs().add(3, 'day'),
        });
      }
    }
  }, [open, editingAssignment, form]);

  const handleFinish = async (values: FormValues) => {
    const payload: CreateAssignmentDTO = {
      subject: values.subject.trim(),
      title: values.title.trim(),
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      priority: values.priority,
      description: values.description?.trim(),
      completed: editingAssignment ? editingAssignment.completed : false,
    };

    await onSubmit(payload);
    form.resetFields();
  };

  return (
    <Modal
      title={
        <Space orientation="horizontal" size={8}>
          {isEditing ? <EditOutlined style={{ color: '#1677ff' }} /> : <BookOutlined style={{ color: '#1677ff' }} />}
          <span>{isEditing ? 'Chỉnh sửa bài tập' : 'Thêm bài tập mới'}</span>
        </Space>
      }
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText={isEditing ? 'Lưu thay đổi' : 'Thêm bài tập'}
      cancelText="Huỷ bỏ"
      destroyOnHidden
      centered
      width={540}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark="optional"
        style={{ marginTop: '16px' }}
      >
        <Form.Item
          label="Môn học"
          name="subject"
          rules={[
            { required: true, message: 'Vui lòng nhập hoặc chọn tên môn học!' },
            { min: 2, message: 'Tên môn học phải từ 2 ký tự trở lên!' },
          ]}
        >
          <AutoComplete
            options={subjectOptions}
            placeholder="VD: Lập trình Web nâng cao"
            filterOption={(inputValue, option) =>
              (option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) ?? -1) !== -1
            }
          />
        </Form.Item>

        <Form.Item
          label="Tên bài tập"
          name="title"
          rules={[
            { required: true, message: 'Vui lòng nhập tên bài tập!' },
            { min: 3, message: 'Tên bài tập phải từ 3 ký tự trở lên!' },
          ]}
        >
          <Input placeholder="VD: Hoàn thành Assignment 3 - Redux Toolkit" maxLength={150} showCount />
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="Hạn nộp deadline"
            name="dueDate"
            rules={[{ required: true, message: 'Vui lòng chọn hạn nộp!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày nộp"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Mức độ ưu tiên"
            name="priority"
            rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
          >
            <Radio.Group buttonStyle="solid" style={{ width: '100%', display: 'flex' }}>
              <Radio.Button value="LOW" style={{ flex: 1, textAlign: 'center', color: '#52c41a' }}>
                <FlagFilled style={{ marginRight: 4 }} />
                Thấp
              </Radio.Button>
              <Radio.Button value="MEDIUM" style={{ flex: 1, textAlign: 'center', color: '#faad14' }}>
                <FlagFilled style={{ marginRight: 4 }} />
                TB
              </Radio.Button>
              <Radio.Button value="HIGH" style={{ flex: 1, textAlign: 'center', color: '#ff4d4f' }}>
                <FlagFilled style={{ marginRight: 4 }} />
                Cao
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item label="Ghi chú / Yêu cầu chi tiết" name="description">
          <Input.TextArea
            rows={3}
            placeholder="Ghi chú thêm về yêu cầu đề bài, tài liệu tham khảo, link nộp bài..."
            maxLength={300}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
