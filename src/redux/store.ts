import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import authReducer from './reducers/authSlice';
import uiReducer from './reducers/uiSlice';
import axolotaryReducer from './reducers/axolotarySlice';
import axolotlReducer from './reducers/axolotlSlice';
import alertReducer from './reducers/alertSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    axolotary: axolotaryReducer,
    axolotl: axolotlReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
