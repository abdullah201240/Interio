import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState, adminAuth: AdminAuthState}
export type AppDispatch = typeof store.dispatch;

export default store;
