// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { signIn, signOut, signUp } from '@/lib/auth';

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const result = await signIn('credentials', {
//         email: credentials.email,
//         password: credentials.password,
//         redirect: false,
//       });

//       if (result?.error) {
//         return rejectWithValue(result.error);
//       }

//       return result;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',  
//   async (_, { rejectWithValue }) => {
//     try {
//       await signOut({ redirect: false });
//       return true;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData: { email: string; password: string; name: string }, { rejectWithValue }) => {
//     try {
//       const result = await signUp(userData);
//       if (result.error) {
//         return rejectWithValue(result.error);
//       }
//       return result.data;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
//     }
//   }
// );

// export const updateUserProfile = createAsyncThunk(
//   'auth/updateUserProfile',
//   async (userData: Partial<any>, { rejectWithValue }) => { // eslint-disable-line
//     try {
//       const response = await fetch('/api/user/profile', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.message);
//       }

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Profile update failed');
//     }
//   }
// );
