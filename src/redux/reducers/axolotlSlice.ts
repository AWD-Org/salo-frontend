import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axolotl } from '@/types';

interface AxolotlState {
  axolotls: Axolotl[];
  currentAxolotl: Axolotl | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AxolotlState = {
  axolotls: [],
  currentAxolotl: null,
  isLoading: false,
  error: null,
};

const axolotlSlice = createSlice({
  name: 'axolotl',
  initialState,
  reducers: {
    setAxolotls: (state, action: PayloadAction<Axolotl[]>) => {
      state.axolotls = action.payload;
      state.error = null;
    },
    setCurrentAxolotl: (state, action: PayloadAction<Axolotl>) => {
      state.currentAxolotl = action.payload;
      state.error = null;
    },
    addAxolotl: (state, action: PayloadAction<Axolotl>) => {
      state.axolotls.push(action.payload);
    },
    updateAxolotl: (state, action: PayloadAction<Axolotl>) => {
      const index = state.axolotls.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.axolotls[index] = action.payload;
      }
      if (state.currentAxolotl?.id === action.payload.id) {
        state.currentAxolotl = action.payload;
      }
    },
    removeAxolotl: (state, action: PayloadAction<string>) => {
      state.axolotls = state.axolotls.filter(a => a.id !== action.payload);
      if (state.currentAxolotl?.id === action.payload) {
        state.currentAxolotl = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setAxolotls,
  setCurrentAxolotl,
  addAxolotl,
  updateAxolotl,
  removeAxolotl,
  setLoading,
  setError,
  clearError,
} = axolotlSlice.actions;

export default axolotlSlice.reducer;
