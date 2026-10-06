import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Assignment,
  CreateAssignmentDTO,
  FilterStatus,
  SortByOption,
  SortDirection,
  UpdateAssignmentDTO,
} from '../../types/assignment';
import { assignmentMockApi } from './mockApi';

/**
 * ============================================================================
 * BUỔI 3: REDUX TOOLKIT + TYPESCRIPT (FEATURE-BASED STRUCTURE & ASYNC THUNK)
 * ============================================================================
 */

export interface AssignmentState {
  items: Assignment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // Filter & Search states
  filterStatus: FilterStatus;
  searchQuery: string;
  selectedSubject: string | null;
  sortBy: SortByOption;
  sortDirection: SortDirection;
}

const initialState: AssignmentState = {
  items: [],
  status: 'idle',
  error: null,
  filterStatus: 'ALL',
  searchQuery: '',
  selectedSubject: null,
  sortBy: 'dueDate',
  sortDirection: 'asc',
};

// --- createAsyncThunk Actions ---

/**
 * Thunk 1: Khởi động app, lấy danh sách mẫu ban đầu từ API giả lập (Yêu cầu 7)
 */
export const fetchAssignmentsThunk = createAsyncThunk<
  Assignment[],
  void,
  { rejectValue: string }
>('assignments/fetchAssignments', async (_, { rejectWithValue }) => {
  try {
    const response = await assignmentMockApi.fetchAssignments();
    return response.data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi không xác định khi tải dữ liệu';
    return rejectWithValue(message);
  }
});

/**
 * Thunk 2: Thêm bài tập mới (Yêu cầu 2)
 */
export const createAssignmentThunk = createAsyncThunk<
  Assignment,
  CreateAssignmentDTO,
  { rejectValue: string }
>('assignments/createAssignment', async (dto, { rejectWithValue }) => {
  try {
    const response = await assignmentMockApi.createAssignment(dto);
    return response.data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi khi thêm bài tập';
    return rejectWithValue(message);
  }
});

/**
 * Thunk 3: Cập nhật / Đánh dấu hoàn thành bài tập (Yêu cầu 3)
 */
export const updateAssignmentThunk = createAsyncThunk<
  Assignment,
  UpdateAssignmentDTO,
  { rejectValue: string }
>('assignments/updateAssignment', async (dto, { rejectWithValue }) => {
  try {
    const response = await assignmentMockApi.updateAssignment(dto);
    return response.data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi khi cập nhật bài tập';
    return rejectWithValue(message);
  }
});

/**
 * Thunk 4: Xoá bài tập (Yêu cầu 4)
 */
export const deleteAssignmentThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('assignments/deleteAssignment', async (id, { rejectWithValue }) => {
  try {
    await assignmentMockApi.deleteAssignment(id);
    return id;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi khi xoá bài tập';
    return rejectWithValue(message);
  }
});

/**
 * Thunk 5: Khôi phục dữ liệu mẫu ban đầu
 */
export const resetAssignmentsThunk = createAsyncThunk<
  Assignment[],
  void,
  { rejectValue: string }
>('assignments/resetAssignments', async (_, { rejectWithValue }) => {
  try {
    const response = await assignmentMockApi.resetToDefault();
    return response.data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi khi khôi phục dữ liệu';
    return rejectWithValue(message);
  }
});

// --- Slice Definition ---

export const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    // Optimistic toggle hoặc sync toggle
    toggleAssignmentImmediate: (state, action: PayloadAction<string>) => {
      const item = state.items.find((a) => a.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedSubject: (state, action: PayloadAction<string | null>) => {
      state.selectedSubject = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortByOption>) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    clearFilters: (state) => {
      state.filterStatus = 'ALL';
      state.searchQuery = '';
      state.selectedSubject = null;
      state.sortBy = 'dueDate';
      state.sortDirection = 'asc';
    },
  },
  extraReducers: (builder) => {
    // 1. Fetch Assignments
    builder
      .addCase(fetchAssignmentsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAssignmentsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAssignmentsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Không thể tải danh sách bài tập';
      });

    // 2. Create Assignment
    builder
      .addCase(createAssignmentThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createAssignmentThunk.rejected, (state, action) => {
        state.error = action.payload ?? 'Thêm bài tập thất bại';
      });

    // 3. Update / Toggle Assignment
    builder
      .addCase(updateAssignmentThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateAssignmentThunk.rejected, (state, action) => {
        state.error = action.payload ?? 'Cập nhật bài tập thất bại';
      });

    // 4. Delete Assignment
    builder
      .addCase(deleteAssignmentThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteAssignmentThunk.rejected, (state, action) => {
        state.error = action.payload ?? 'Xoá bài tập thất bại';
      });

    // 5. Reset Assignments
    builder
      .addCase(resetAssignmentsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetAssignmentsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export const {
  toggleAssignmentImmediate,
  setFilterStatus,
  setSearchQuery,
  setSelectedSubject,
  setSortBy,
  setSortDirection,
  clearFilters,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
