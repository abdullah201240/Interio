import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
  name: string | null;
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state from localStorage', e);
    return null;
  }
};

const initialState: AuthState = loadFromLocalStorage() || {
  token: null,
  email: null,
  name: null
 
};

const saveToLocalStorage = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (e) {
    console.warn('Failed to save state to localStorage', e);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; email: string; name: string; }>) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      saveToLocalStorage(state);
    },
    clearAuth(state) {
      state.token = null;
      state.email = null;
      state.name = null;
      saveToLocalStorage(state);
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
