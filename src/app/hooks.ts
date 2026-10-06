import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

/**
 * ============================================================================
 * BUỔI 3: TYPED REDUX HOOKS
 * ============================================================================
 * Sử dụng trong toàn bộ app thay cho plain `useDispatch` và `useSelector`
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
