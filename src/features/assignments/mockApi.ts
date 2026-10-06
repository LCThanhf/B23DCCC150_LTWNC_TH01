import dayjs from 'dayjs';
import type { ApiResponse, Assignment, CreateAssignmentDTO, UpdateAssignmentDTO } from '../../types/assignment';

const STORAGE_KEY = 'student_deadline_tracker_data_v1';

/**
 * Sinh danh sách bài tập mẫu ban đầu với hạn nộp linh động theo ngày hiện tại
 */
export function generateInitialMockData(): Assignment[] {
  const today = dayjs();

  return [
    {
      id: 'asg-001',
      subject: 'Lập trình Web nâng cao',
      title: 'Xây dựng Student Deadline Tracker với Redux Toolkit & TypeScript',
      dueDate: today.add(2, 'day').format('YYYY-MM-DD'),
      priority: 'HIGH',
      completed: false,
      createdAt: today.subtract(3, 'day').toISOString(),
      description: 'Hoàn thiện 3 mục tiêu: TS nâng cao, Design pattern React (Compound Component), Redux Toolkit.',
    },
    {
      id: 'asg-002',
      subject: 'Cơ sở dữ liệu phân tán',
      title: 'Thiết kế Sharding & Replication cho MongoDB Cluster',
      dueDate: today.format('YYYY-MM-DD'), // Hạn chót hôm nay
      priority: 'HIGH',
      completed: false,
      createdAt: today.subtract(4, 'day').toISOString(),
      description: 'Nộp báo cáo kiến trúc phân mảnh và kịch bản benchmark truy vấn phân tán.',
    },
    {
      id: 'asg-003',
      subject: 'Kiến trúc phần mềm',
      title: 'Báo cáo phân tích Microservices & Event-Driven Architecture',
      dueDate: today.subtract(2, 'day').format('YYYY-MM-DD'), // Quá hạn 2 ngày
      priority: 'MEDIUM',
      completed: false,
      createdAt: today.subtract(6, 'day').toISOString(),
      description: 'Vẽ sơ đồ C4 Model cấp độ Container và Component cho hệ thống E-commerce.',
    },
    {
      id: 'asg-004',
      subject: 'Trí tuệ nhân tạo',
      title: 'Huấn luyện mô hình CNN phân loại ảnh hoa quả',
      dueDate: today.add(5, 'day').format('YYYY-MM-DD'), // Còn 5 ngày
      priority: 'MEDIUM',
      completed: false,
      createdAt: today.subtract(2, 'day').toISOString(),
      description: 'Fine-tuning ResNet50 với PyTorch và xuất báo cáo độ chính xác Confusion Matrix.',
    },
    {
      id: 'asg-005',
      subject: 'Phát triển ứng dụng di động',
      title: 'Xây dựng màn hình Authentication với Flutter & Bloc',
      dueDate: today.add(8, 'day').format('YYYY-MM-DD'), // Còn 8 ngày
      priority: 'LOW',
      completed: false,
      createdAt: today.subtract(1, 'day').toISOString(),
      description: 'Tích hợp Firebase Auth và xác thực sinh trắc học vân tay/FaceID.',
    },
    {
      id: 'asg-006',
      subject: 'Lập trình Web nâng cao',
      title: 'Tìm hiểu Redux Toolkit và RTK Query cơ bản',
      dueDate: today.subtract(1, 'day').format('YYYY-MM-DD'),
      priority: 'MEDIUM',
      completed: true, // Đã hoàn thành
      createdAt: today.subtract(5, 'day').toISOString(),
      description: 'Đã hoàn thành bài tập nghiên cứu và thực hành slice reducers.',
    },
  ];
}

/**
 * Đọc dữ liệu từ LocalStorage hoặc khởi tạo nếu chưa có
 */
function getStoredAssignments(): Assignment[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initial = generateInitialMockData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(stored) as Assignment[];
  } catch {
    const initial = generateInitialMockData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

function saveStoredAssignments(assignments: Assignment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

export const assignmentMockApi = {
  /**
   * Lấy toàn bộ danh sách bài tập (Simulate GET /api/assignments)
   */
  async fetchAssignments(): Promise<ApiResponse<Assignment[]>> {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Giả lập network delay 600ms

    const data = getStoredAssignments();

    return {
      success: true,
      data,
      message: 'Lấy danh sách bài tập thành công!',
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  },

  /**
   * Tạo bài tập mới (Simulate POST /api/assignments)
   */
  async createAssignment(dto: CreateAssignmentDTO): Promise<ApiResponse<Assignment>> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newAssignment: Assignment = {
      ...dto,
      id: `asg-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      completed: dto.completed ?? false,
    };

    const currentList = getStoredAssignments();
    const updatedList = [newAssignment, ...currentList];
    saveStoredAssignments(updatedList);

    return {
      success: true,
      data: newAssignment,
      message: 'Tạo bài tập mới thành công!',
      timestamp: new Date().toISOString(),
      statusCode: 201,
    };
  },

  /**
   * Cập nhật bài tập (Simulate PUT /api/assignments/:id)
   */
  async updateAssignment(dto: UpdateAssignmentDTO): Promise<ApiResponse<Assignment>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const currentList = getStoredAssignments();
    const index = currentList.findIndex((item) => item.id === dto.id);

    if (index === -1) {
      throw new Error(`Không tìm thấy bài tập có id "${dto.id}"`);
    }

    const updatedItem: Assignment = {
      ...currentList[index],
      ...dto,
    };

    currentList[index] = updatedItem;
    saveStoredAssignments(currentList);

    return {
      success: true,
      data: updatedItem,
      message: 'Cập nhật bài tập thành công!',
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  },

  /**
   * Xoá bài tập (Simulate DELETE /api/assignments/:id)
   */
  async deleteAssignment(id: string): Promise<ApiResponse<{ id: string }>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const currentList = getStoredAssignments();
    const updatedList = currentList.filter((item) => item.id !== id);
    saveStoredAssignments(updatedList);

    return {
      success: true,
      data: { id },
      message: 'Xoá bài tập thành công!',
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  },

  /**
   * Reset về dữ liệu mẫu gốc
   */
  async resetToDefault(): Promise<ApiResponse<Assignment[]>> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const initial = generateInitialMockData();
    saveStoredAssignments(initial);
    return {
      success: true,
      data: initial,
      message: 'Khôi phục dữ liệu mẫu thành công!',
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  },
};
