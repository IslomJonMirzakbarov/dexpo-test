import { createSlice } from '@reduxjs/toolkit'

export const { actions: walletActions, reducer: walletReducer } = createSlice({
  name: 'wallet',
  initialState: {
    account: null,
    signature: null,
    nonce: null,
    price_usd: null,
    type: null,
    price_krw: null
  },
  reducers: {
    setAccount: (state, { payload }) => {
      state.account = payload
    },
    setNonce: (state, { payload }) => {
      state.nonce = payload
    },
    setSignature: (state, { payload }) => {
      state.signature = payload
    },
    setPriceeUSD: (state, { payload }) => {
      state.price_usd = payload
    },
    setPriceKrw: (state, { payload }) => {
      state.price_krw = payload
    },
    setType: (state, { payload }) => {
      state.type = payload
    },
    clearWallet: (state) => {
      state.account = null
      state.signature = null
      state.nonce = null
    }
  }
})

export const {
  setAccount,
  setNonce,
  setSignature,
  clearWallet,
  setPriceeUSD,
  setType,
  setPriceKrw
} = walletActions
