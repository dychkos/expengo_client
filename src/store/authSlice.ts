import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../app/types/user.type';

interface UserState {
  userInfo: UserType | null;
  accessToken: string
  isAuthorized: boolean
}

const initialState: UserState = {
  userInfo: null,
  accessToken: '',
  isAuthorized: false
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserType>) => {
      state.userInfo = action.payload;
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setAuthorized } = userSlice.actions;