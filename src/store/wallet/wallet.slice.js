import { createSlice } from '@reduxjs/toolkit';

export const { actions: walletActions, reducer: walletReducer } = createSlice({
  name: 'wallet',
  initialState: {
    account: null
  },
  reducers: {
    setAccount: (state, { payload }) => {
      console.log(state, payload);
      state.account = payload;
    }
  }
});
