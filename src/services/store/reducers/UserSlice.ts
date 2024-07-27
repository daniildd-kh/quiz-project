import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../../utils/types';
import {
  fetchCreateUserWithEmailAndPassword,
  fetchSignInWithEmailAndPassword,
} from '../actions';

interface UserState {
  user: TUser | null;
  authRequest: boolean;
  isAuth: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  authRequest: false,
  isAuth: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignInWithEmailAndPassword.pending, (state) => {
      state.authRequest = true;
    });
    builder.addCase(
      fetchSignInWithEmailAndPassword.fulfilled,
      (state, action) => {
        state.authRequest = false;
        state.user = action.payload;
        state.isAuth = true;
        state.error = null;
      },
    );
    builder.addCase(
      fetchSignInWithEmailAndPassword.rejected,
      (state, action) => {
        state.authRequest = false;
        state.isAuth = false;
        state.error = action.payload || 'Произошла ошибка при авторизации';
      },
    );
    builder.addCase(fetchCreateUserWithEmailAndPassword.pending, (state) => {
      state.authRequest = true;
    });
    builder.addCase(
      fetchCreateUserWithEmailAndPassword.fulfilled,
      (state, action) => {
        state.authRequest = false;
        state.user = action.payload;
        state.isAuth = true;
        state.error = null;
      },
    );
    builder.addCase(
      fetchCreateUserWithEmailAndPassword.rejected,
      (state, action) => {
        state.authRequest = false;
        state.isAuth = false;
        state.error = action.payload || 'Произошла ошибка при регистрации';
      },
    );
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
