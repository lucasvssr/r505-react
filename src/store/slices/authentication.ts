import { createSlice } from '@reduxjs/toolkit';
import { authenticationApi } from '../../services/authentication';

interface AuthenticationState {
  token: string | null;
  refreshToken: string | null;
  user: any | null;
  connected: boolean;
}

const initialState: AuthenticationState = {
  token: null,
  refreshToken: null,
  user: null,
  connected: false,
};

export const authenticationReducer = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.connected = false;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authenticationApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        state.user = payload.user;
        state.connected = true;
      }
    );
  },
});
