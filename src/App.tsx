import React, { useEffect } from 'react';
import { ConfigProvider, Layout, message, theme, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  clearFilters,
  createAssignmentThunk,
  deleteAssignmentThunk,
  fetchAssignmentsThunk,
  resetAssignmentsThunk,
  setFilterStatus,
  setSearchQuery,
  setSelectedSubject,
  setSortBy,
  setSortDirection,
  updateAssignmentThunk,
} from './features/assignments/assignmentSlice';
import {
  closeModal,
  openCreateModal,
  openEditModal,
  toggleTheme,
} from './features/ui/uiSlice';
import { useAssignmentFilter } from './hooks/useAssignmentFilter';
import { HeaderNavbar } from './components/HeaderNavbar';
import { DashboardStats } from './components/DashboardStats';
import { AssignmentFilterBar } from './components/AssignmentFilterBar';
import { AssignmentList } from './components/AssignmentList';
import { AssignmentFormModal } from './components/AssignmentFormModal';
import type { CreateAssignmentDTO } from './types/assignment';

const { Content, Footer } = Layout;
const { Text } = Typography;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  // Redux States
  const {
    items: assignments,
    status,
    error,
    filterStatus,
    searchQuery,
    selectedSubject,
    sortBy,
    sortDirection,
  } = useAppSelector((state) => state.assignments);

  const { isDarkMode, isCreateModalOpen, editingAssignment } = useAppSelector((state) => state.ui);

  // Yêu cầu 7: Khởi động app, lấy danh sách mẫu ban đầu từ 1 API giả lập qua createAsyncThunk
  useEffect(() => {
    dispatch(fetchAssignmentsThunk());
  }, [dispatch]);

  // Thông báo khi có lỗi
  useEffect(() => {
    if (error) {
      messageApi.error(error);
    }
  }, [error, messageApi]);

  // Custom Hook nâng cao (Buổi 2): Lọc, tìm kiếm, phân loại và thống kê
  const { filteredAssignments, stats, availableSubjects } = useAssignmentFilter({
    assignments,
    filterStatus,
    searchQuery,
    selectedSubject,
    sortBy,
    sortDirection,
  });

  // Xử lý đánh dấu hoàn thành / bỏ đánh dấu (Yêu cầu 3)
  const handleToggleComplete = async (id: string, currentCompleted: boolean) => {
    try {
      await dispatch(updateAssignmentThunk({ id, completed: !currentCompleted })).unwrap();
      messageApi.success(
        !currentCompleted ? 'Đã đánh dấu hoàn thành bài tập! 🎉' : 'Đã bỏ đánh dấu hoàn thành.'
      );
    } catch {
      messageApi.error('Không thể cập nhật trạng thái bài tập');
    }
  };

  // Xử lý xoá bài tập (Yêu cầu 4)
  const handleDeleteAssignment = async (id: string) => {
    try {
      await dispatch(deleteAssignmentThunk(id)).unwrap();
      messageApi.success('Đã xoá bài tập thành công!');
    } catch {
      messageApi.error('Không thể xoá bài tập');
    }
  };

  // Xử lý submit form thêm mới hoặc chỉnh sửa (Yêu cầu 2)
  const handleFormSubmit = async (values: CreateAssignmentDTO) => {
    try {
      if (editingAssignment) {
        await dispatch(
          updateAssignmentThunk({
            id: editingAssignment.id,
            ...values,
          })
        ).unwrap();
        messageApi.success('Đã cập nhật bài tập thành công!');
      } else {
        await dispatch(createAssignmentThunk(values)).unwrap();
        messageApi.success('Đã thêm bài tập mới thành công! 🚀');
      }
      dispatch(closeModal());
    } catch {
      messageApi.error('Thao tác bài tập thất bại');
    }
  };

  // Khôi phục dữ liệu mẫu ban đầu
  const handleResetMockData = async () => {
    try {
      await dispatch(resetAssignmentsThunk()).unwrap();
      messageApi.info('Đã tải lại danh sách bài tập mẫu ban đầu từ Mock API.');
    } catch {
      messageApi.error('Không thể khôi phục dữ liệu mẫu');
    }
  };

  const isLoading = status === 'loading';

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      {contextHolder}
      <Layout
        style={{
          minHeight: '100vh',
          background: isDarkMode ? '#0a0a0a' : '#f5f7fa',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Thanh Navigation Header */}
        <HeaderNavbar
          isDarkMode={isDarkMode}
          onToggleTheme={() => dispatch(toggleTheme())}
          onOpenCreate={() => dispatch(openCreateModal())}
          onResetMockData={handleResetMockData}
          resetLoading={isLoading}
        />

        {/* Nội dung chính ứng dụng */}
        <Content
          style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '24px 16px',
          }}
        >
          {/* 1. Thống kê tổng quan */}
          <DashboardStats stats={stats} />

          {/* 2. Thanh lọc theo trạng thái, tìm kiếm, lọc theo môn, sắp xếp (Yêu cầu 5) */}
          <AssignmentFilterBar
            filterStatus={filterStatus}
            onFilterChange={(status) => dispatch(setFilterStatus(status))}
            stats={stats}
            searchQuery={searchQuery}
            onSearchChange={(q) => dispatch(setSearchQuery(q))}
            availableSubjects={availableSubjects}
            selectedSubject={selectedSubject}
            onSubjectChange={(s) => dispatch(setSelectedSubject(s))}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={(field, dir) => {
              dispatch(setSortBy(field));
              dispatch(setSortDirection(dir));
            }}
          />

          {/* 3. Danh sách bài tập qua Compound Component (Yêu cầu 1, 3, 4, 6) */}
          <AssignmentList
            assignments={filteredAssignments}
            loading={isLoading}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteAssignment}
            onEdit={(assignment) => dispatch(openEditModal(assignment))}
            onAddNew={() => dispatch(openCreateModal())}
            onResetFilter={() => dispatch(clearFilters())}
          />
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: 'center',
            background: isDarkMode ? '#141414' : '#ffffff',
            borderTop: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
            padding: '20px 16px',
            marginTop: 'auto',
          }}
        >
          <Text type="secondary" style={{ fontSize: '13px' }}>
            <strong>Student Deadline Tracker</strong> — Đồ án môn Lập trình Web nâng cao
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Áp dụng: TypeScript Nâng cao • React Compound Component & HOC • Redux Toolkit (RTK) • Ant Design
          </Text>
        </Footer>

        {/* Modal Thêm & Chỉnh sửa bài tập (Yêu cầu 2) */}
        <AssignmentFormModal
          open={isCreateModalOpen}
          onClose={() => dispatch(closeModal())}
          onSubmit={handleFormSubmit}
          editingAssignment={editingAssignment}
          loading={isLoading}
          availableSubjects={availableSubjects}
        />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
