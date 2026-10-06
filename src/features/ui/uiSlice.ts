import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Assignment } from '../../types/assignment';

export interface UiState {
  isDarkMode: boolean;
  isCreateModalOpen: boolean;
  editingAssignment: Assignment | null;
}

const initialState: UiState = {
  isDarkMode: false,
  isCreateModalOpen: false,
  editingAssignment: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    openCreateModal: (state) => {
      state.editingAssignment = null;
      state.isCreateModalOpen = true;
    },
    openEditModal: (state, action: PayloadAction<Assignment>) => {
      state.editingAssignment = action.payload;
      state.isCreateModalOpen = true;
    },
    closeModal: (state) => {
      state.isCreateModalOpen = false;
      state.editingAssignment = null;
    },
  },
});

export const { toggleTheme, setDarkMode, openCreateModal, openEditModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
