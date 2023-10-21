import { createSlice } from '@reduxjs/toolkit';

interface Notification {
  id: number;
  content: string;
  type: 'success' | 'error' | 'warning' | 'info';
  visible: boolean;
}

export const notificationsReducer = createSlice({
  name: 'notifications',
  initialState: [] as Notification[],
  reducers: {
    addNotification: (state, action) => {
      state.push({
        id: Date.now(),
        content: action.payload.content,
        type: ['success', 'error', 'warning', 'info'].includes(
          action.payload.type
        )
          ? action.payload.type
          : undefined,
        visible: true,
      });
    },
    deleteNotification: (state, action) => {
      return state.filter(
        (notification) => notification.id !== action.payload.id
      );
    },
    hideNotification: (state, action) => {
      return state.map((notification) => {
        const { id, content, type, visible } = notification;
        const copy = { id, content, type, visible };

        if (copy.id === action.payload.id) {
          copy.visible = false;
        }
        return copy;
      });
    },
    deleteAllNotifications: () => {
      return [];
    },
  },
});

export const {
  addNotification,
  deleteNotification,
  hideNotification,
  deleteAllNotifications,
} = notificationsReducer.actions;
