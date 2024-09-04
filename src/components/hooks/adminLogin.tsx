import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const adminUseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
