import { createSlice } from '@reduxjs/toolkit';

export const { actions: walletActions, reducer: walletReducer } = createSlice({
  name: 'wallet',
  initialState: {
    account: null,
    signature: null,
    nonce: null
  },
  reducers: {
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setNonce: (state, { payload }) => {
      state.nonce = payload;
    },
    setSignature: (state, { payload }) => {
      state.signature = payload;
    }
  }
});

export const { setAccount, setNonce, setSignature } = walletActions;
