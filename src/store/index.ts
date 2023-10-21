import { configureStore } from '@reduxjs/toolkit';
import { notificationsReducer } from './slices/notifications';
import { authenticationApi } from '../services/authentication';
import { authenticationReducer } from './slices/authentication';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer.reducer,
    authentication: authenticationReducer.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware),
});
