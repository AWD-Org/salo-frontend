import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axolotary } from '@/types';

interface AxolotaryState {
  axolotaries: Axolotary[];
  currentAxolotary: Axolotary | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AxolotaryState = {
  axolotaries: [],
  currentAxolotary: null,
  isLoading: false,
  error: null,
};

const axolotarySlice = createSlice({
  name: 'axolotary',
  initialState,
  reducers: {
    setAxolotaries: (state, action: PayloadAction<Axolotary[]>) => {
      state.axolotaries = action.payload;
      state.error = null;
    },
    setCurrentAxolotary: (state, action: PayloadAction<Axolotary>) => {
      state.currentAxolotary = action.payload;
      state.error = null;
    },
    addAxolotary: (state, action: PayloadAction<Axolotary>) => {
      state.axolotaries.push(action.payload);
    },
    updateAxolotary: (state, action: PayloadAction<Axolotary>) => {
      const index = state.axolotaries.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.axolotaries[index] = action.payload;
      }
      if (state.currentAxolotary?.id === action.payload.id) {
        state.currentAxolotary = action.payload;
      }
    },
    removeAxolotary: (state, action: PayloadAction<string>) => {
      state.axolotaries = state.axolotaries.filter(a => a.id !== action.payload);
      if (state.currentAxolotary?.id === action.payload) {
        state.currentAxolotary = null;
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
  setAxolotaries,
  setCurrentAxolotary,
  addAxolotary,
  updateAxolotary,
  removeAxolotary,
  setLoading,
  setError,
  clearError,
} = axolotarySlice.actions;

export default axolotarySlice.reducer;
