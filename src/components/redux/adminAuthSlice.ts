import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminAuthState {
  token: string | null;
  email: string | null;
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('adminAuthState');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state from localStorage', e);
    return null;
  }
};

const initialState: AdminAuthState = loadFromLocalStorage() || {
  token: null,
  email: null,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdminAuth(state, action: PayloadAction<{ token: string; email: string }>) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      saveToLocalStorage(state);
    },
    clearAdminAuth(state) {
      state.token = null;
      state.email = null;
      saveToLocalStorage(state);
    },
  },
});

const saveToLocalStorage = (state: AdminAuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('adminAuthState', serializedState);
  } catch (e) {
    console.warn('Failed to save state to localStorage', e);
  }
};

export const { setAdminAuth, clearAdminAuth } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
