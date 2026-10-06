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

export interface AssignmentState {
  items: Assignment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
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

export const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
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
      })
      .addCase(createAssignmentThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createAssignmentThunk.rejected, (state, action) => {
        state.error = action.payload ?? 'Thêm bài tập thất bại';
      })
      .addCase(updateAssignmentThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateAssignmentThunk.rejected, (state, action) => {
        state.error = action.payload ?? 'Cập nhật bài tập thất bại';
      })
      .addCase(deleteAssignmentThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteAssignmentThunk.rejected, (state, action) => {
        state.error = action.payload ?? 'Xoá bài tập thất bại';
      })
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
