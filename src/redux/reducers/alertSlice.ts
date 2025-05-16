import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '@/types';

interface AlertState {
  alerts: Alert[];
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
}

const initialState: AlertState = {
  alerts: [],
  isLoading: false,
  error: null,
  unreadCount: 0,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
      state.unreadCount = action.payload.filter(alert => alert.status === 'active').length;
      state.error = null;
    },
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.unshift(action.payload);
      if (action.payload.status === 'active') {
        state.unreadCount += 1;
      }
    },
    updateAlert: (state, action: PayloadAction<Alert>) => {
      const index = state.alerts.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        const oldAlert = state.alerts[index];
        state.alerts[index] = action.payload;
        
        // Update unread count
        if (oldAlert.status === 'active' && action.payload.status === 'resolved') {
          state.unreadCount -= 1;
        } else if (oldAlert.status === 'resolved' && action.payload.status === 'active') {
          state.unreadCount += 1;
        }
      }
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert && alert.status === 'active') {
        state.unreadCount -= 1;
      }
      state.alerts = state.alerts.filter(a => a.id !== action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert && alert.status === 'active') {
        alert.status = 'resolved';
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.alerts.forEach(alert => {
        if (alert.status === 'active') {
          alert.status = 'resolved';
        }
      });
      state.unreadCount = 0;
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
  setAlerts,
  addAlert,
  updateAlert,
  removeAlert,
  markAsRead,
  markAllAsRead,
  setLoading,
  setError,
  clearError,
} = alertSlice.actions;

export default alertSlice.reducer;
