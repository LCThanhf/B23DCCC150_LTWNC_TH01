import { configureStore } from '@reduxjs/toolkit';
import assignmentReducer from '../features/assignments/assignmentSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    assignments: assignmentReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
