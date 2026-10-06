import { configureStore } from '@reduxjs/toolkit';
import assignmentReducer from '../features/assignments/assignmentSlice';
import uiReducer from '../features/ui/uiSlice';

/**
 * ============================================================================
 * BUỔI 3: REDUX STORE CONFIGURATION
 * ============================================================================
 */

export const store = configureStore({
  reducer: {
    assignments: assignmentReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
