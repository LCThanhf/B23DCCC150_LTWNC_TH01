# 🎓 Student Deadline Tracker

> **Web App quản lý deadline bài tập cá nhân dành cho sinh viên**  
> Vận dụng tổng hợp các kiến thức đã học trong môn **Lập trình Web Nâng Cao (LTWNC)**.

---

## 🌟 Tổng Quan Kiến Trúc & Mục Tiêu Đồ Án

Ứng dụng đáp ứng đầy đủ và vượt chuẩn các yêu cầu chuyên đề:

### 1. Buổi 1 — TypeScript Nâng Cao
- **Generic Types**:
  - `ApiResponse<T>`: Generic type chuẩn hoá phản hồi từ Mock API ([src/types/assignment.ts](file:///d:/BtapLTWNC/src/types/assignment.ts)).
  - `FilterCriteria<T>` & `PaginatedResult<T>`: Generic criteria cho tìm kiếm & phân trang.
  - `sortByGeneric<T, K extends keyof T>(items: T[], key: K, direction: SortDirection): T[]`: Generic sort function ([src/utils/typeGuards.ts](file:///d:/BtapLTWNC/src/utils/typeGuards.ts)).
- **Utility Types**:
  - `Omit<Assignment, 'id' | 'createdAt'>` cho `CreateAssignmentDTO`.
  - `Pick<Assignment, 'id'> & Partial<Omit<Assignment, 'id' | 'createdAt'>>` cho `UpdateAssignmentDTO`.
  - `Pick<Assignment, 'id' | 'title' | ...>` cho `AssignmentSummary`.
  - `Record<PriorityLevel, PriorityConfig>` cho `PriorityConfigMap`.
  - `Record<FilterStatus, number>` cho `FilterStatsMap`.
- **Type Guards**:
  - `isPriority(value: unknown): value is PriorityLevel`
  - `isAssignment(obj: unknown): obj is Assignment`
  - `isValidDateString(val: unknown): val is string`
  - `isAssignmentOverdue(assignment: Assignment): boolean`
  - `isNonNullable<T>(value: T | null | undefined): value is T`

### 2. Buổi 2 — React Design Patterns
- **Custom Hook Nâng Cao**:
  - `useDeadlineCountdown`: Tính toán chi tiết số ngày còn lại/quá hạn ("Còn X ngày", "Quá hạn Y ngày", "Hạn chót hôm nay"), tự động xác định trạng thái cảnh báo khẩn cấp (`isUrgent`), mã màu Ant Design Tag ([src/hooks/useDeadlineCountdown.ts](file:///d:/BtapLTWNC/src/hooks/useDeadlineCountdown.ts)).
  - `useAssignmentFilter`: Xử lý lọc theo trạng thái, tìm kiếm theo từ khoá, lọc theo môn học, sắp xếp đa tiêu chí và tổng hợp thống kê thời gian thực ([src/hooks/useAssignmentFilter.ts](file:///d:/BtapLTWNC/src/hooks/useAssignmentFilter.ts)).
- **Compound Component Pattern**:
  - `<DeadlineCard>` compound component gồm các sub-components độc lập, giao tiếp thông qua React Context ([src/components/common/DeadlineCard/](file:///d:/BtapLTWNC/src/components/common/DeadlineCard/)):
    - `<DeadlineCard.Header />`: Hiển thị môn học và mức độ ưu tiên
    - `<DeadlineCard.Title />`: Tiêu đề bài tập + Checkbox hoàn thành
    - `<DeadlineCard.Countdown />`: Badge hạn chót đếm ngược ("Còn X ngày" / "Quá hạn Y ngày")
    - `<DeadlineCard.Meta />`: Hạn nộp theo định dạng ngày và ghi chú chi tiết
    - `<DeadlineCard.Actions />`: Thao tác hoàn thành, chỉnh sửa và xoá (kèm Popconfirm)
- **Higher-Order Component Pattern (HOC Bonus)**:
  - `withUrgencyHighlight`: Bọc component với hiệu ứng glow animation cảnh báo khi bài tập bị quá hạn ([src/components/hoc/withUrgencyHighlight.tsx](file:///d:/BtapLTWNC/src/components/hoc/withUrgencyHighlight.tsx)).

### 3. Buổi 3 — Redux Toolkit + TypeScript
- **Feature-Based Structure**:
  - `src/features/assignments/`: Quản lý toàn bộ state bài tập, mock API và async thunks.
  - `src/features/ui/`: Quản lý theme (Dark/Light mode) và trạng thái modal.
- **Typed Hooks**:
  - `useAppDispatch` và `useAppSelector` được type hóa an toàn với `RootState` và `AppDispatch` ([src/app/hooks.ts](file:///d:/BtapLTWNC/src/app/hooks.ts)).
- **createAsyncThunk**:
  - `fetchAssignmentsThunk`: Gọi API giả lập với độ trễ mạng để lấy danh sách bài tập mẫu ban đầu.
  - `createAssignmentThunk`: Thêm bài tập mới bất đồng bộ.
  - `updateAssignmentThunk`: Cập nhật trạng thái hoàn thành / sửa bài tập.
  - `deleteAssignmentThunk`: Xoá bài tập bất đồng bộ.
  - `resetAssignmentsThunk`: Khôi phục dữ liệu mẫu ban đầu.

---

## 📋 Danh Sách 8 Chức Năng Đã Thực Hiện

| STT | Yêu cầu chức năng | Vị trí triển khai / Mô tả |
| :---: | :--- | :--- |
| **1** | **Hiển thị danh sách bài tập** (môn, tên, hạn nộp, ưu tiên, hoàn thành) | Hiển thị dạng Card Ant Design sinh động qua Compound Component `<DeadlineCard>`. |
| **2** | **Thêm bài tập mới qua form** | Form Modal Ant Design với AutoComplete chọn môn học, DatePicker chọn hạn nộp, Radio chọn mức ưu tiên (Cao/TB/Thấp) và ghi chú. |
| **3** | **Đánh dấu hoàn thành / bỏ đánh dấu** | Tương tác nhanh qua Checkbox hoặc nút Xong/Hoàn tác, có gạch ngang tiêu đề và đổi màu viền. |
| **4** | **Xoá bài tập** | Nút xoá có Ant Design `Popconfirm` xác nhận tránh bấm nhầm. |
| **5** | **Lọc theo trạng thái** (Tất cả / Chưa hoàn thành / Quá hạn / Đã hoàn thành) | Radio Group tabs kèm theo Badge hiển thị số lượng bài tập theo từng mục; kết hợp ô tìm kiếm và lọc theo môn. |
| **6** | **Mỗi bài tập hiển thị "Còn X ngày" hoặc "Quá hạn Y ngày"** | Tính toán tự động theo ngày hiện tại: "Quá hạn X ngày", "Hạn chót hôm nay", "Còn 1 ngày (Ngày mai)", "Còn X ngày". |
| **7** | **Khởi động app lấy danh sách mẫu từ API giả lập** | Redux `fetchAssignmentsThunk` gọi `assignmentMockApi.fetchAssignments()` với `setTimeout` 600ms, có Skeleton loading. |
| **8** | **CSS styling sử dụng Ant Design** | Sử dụng trọn bộ Ant Design v5, hỗ trợ chuyển đổi mượt mà Light Mode ☀️ / Dark Mode 🌙. |

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
d:/BtapLTWNC/
├── src/
│   ├── app/                               # Redux Store & Typed Hooks
│   │   ├── hooks.ts                       # useAppDispatch & useAppSelector
│   │   └── store.ts                       # configureStore
│   ├── features/                          # Feature-based Redux Slices
│   │   ├── assignments/
│   │   │   ├── assignmentSlice.ts         # Reducers & createAsyncThunk
│   │   │   └── mockApi.ts                 # Simulated API service (delay, localStorage)
│   │   └── ui/
│   │       └── uiSlice.ts                 # Dark mode, modal states
│   ├── types/
│   │   └── assignment.ts                  # Generics, Utility Types, Interfaces
│   ├── utils/
│   │   ├── dateUtils.ts                   # Tính toán deadline, format ngày, priority config
│   │   └── typeGuards.ts                  # Custom Type Guards & Generic utilities
│   ├── hooks/
│   │   ├── useDeadlineCountdown.ts        # Custom hook đếm ngày deadline
│   │   └── useAssignmentFilter.ts         # Custom hook lọc, tìm kiếm, thống kê
│   ├── components/
│   │   ├── common/
│   │   │   └── DeadlineCard/              # Compound Component Pattern
│   │   │       ├── DeadlineCardContext.ts
│   │   │       ├── DeadlineCard.tsx       # Root Provider
│   │   │       ├── DeadlineCardHeader.tsx # Sub-component Header
│   │   │       ├── DeadlineCardTitle.tsx  # Sub-component Title
│   │   │       ├── DeadlineCardCountdown.tsx # Sub-component Countdown ("Còn X ngày")
│   │   │       ├── DeadlineCardMeta.tsx   # Sub-component Meta
│   │   │       ├── DeadlineCardActions.tsx# Sub-component Actions
│   │   │       └── index.ts               # Object.assign compound export
│   │   ├── hoc/                           # Higher-Order Component Pattern
│   │   │   └── withUrgencyHighlight.tsx
│   │   ├── DashboardStats.tsx             # Thống kê tổng bài tập, quá hạn, hoàn thành
│   │   ├── AssignmentFilterBar.tsx        # Bộ lọc trạng thái, tìm kiếm, sắp xếp
│   │   ├── AssignmentFormModal.tsx        # Form thêm/sửa bài tập Ant Design
│   │   ├── AssignmentList.tsx             # Grid danh sách bài tập & Empty state
│   │   └── HeaderNavbar.tsx               # Header, Dark Mode toggle, Dữ liệu mẫu
│   ├── App.tsx                            # Root Component
│   ├── main.tsx                           # Mount React & Redux Provider
│   └── index.css                          # Custom global styles & animations
├── package.json
└── tsconfig.json
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Cài đặt các thư viện cần thiết
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Development Server)
```bash
npm run dev
```
Truy cập trình duyệt tại: **http://localhost:5173/**

### 3. Kiểm tra kiểu dữ liệu & đóng gói sản phẩm (Production Build)
```bash
npm run build
```
Lệnh trên thực thi `tsc -b && vite build` để xác thực toàn bộ TypeScript type check nghiêm ngặt trước khi đóng gói.
