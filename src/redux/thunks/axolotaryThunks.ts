import { createAsyncThunk } from '@reduxjs/toolkit';
import { Axolotary } from '@/types';

export const fetchAxolotaries = createAsyncThunk(
  'axolotary/fetchAxolotaries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/axolotaries');
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch axolotaries');
    }
  }
);

export const createAxolotary = createAsyncThunk(
  'axolotary/createAxolotary',
  async (axolotaryData: Omit<Axolotary, 'id' | 'createdAt' | 'updatedAt' | 'ponds'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/axolotaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(axolotaryData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create axolotary');
    }
  }
);

export const updateAxolotary = createAsyncThunk(
  'axolotary/updateAxolotary',
  async ({ id, data }: { id: string; data: Partial<Axolotary> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/axolotaries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update axolotary');
    }
  }
);

export const deleteAxolotary = createAsyncThunk(
  'axolotary/deleteAxolotary',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/axolotaries/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete axolotary');
    }
  }
);
