// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { Axolotl } from '@/types';

// export const fetchAxolotls = createAsyncThunk(
//   'axolotl/fetchAxolotls',
//   async (pondId?: string, { rejectWithValue } = {}) => {
//     try {
//       const url = pondId ? `/api/axolotls?pondId=${pondId}` : '/api/axolotls';
//       const response = await fetch(url);
      
//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.message);
//       }
      
//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch axolotls');
//     }
//   }
// );

// export const createAxolotl = createAsyncThunk(
//   'axolotl/createAxolotl',
//   async (axolotlData: Omit<Axolotl, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/axolotls', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(axolotlData),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.message);
//       }

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Failed to create axolotl');
//     }
//   }
// );

// export const updateAxolotl = createAsyncThunk(
//   'axolotl/updateAxolotl',
//   async ({ id, data }: { id: string; data: Partial<Axolotl> }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/axolotls/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.message);
//       }

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Failed to update axolotl');
//     }
//   }
// );

// export const deleteAxolotl = createAsyncThunk(
//   'axolotl/deleteAxolotl',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/axolotls/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.message);
//       }

//       return id;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete axolotl');
//     }
//   }
// );
