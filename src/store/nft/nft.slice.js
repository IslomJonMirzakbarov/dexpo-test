import { createSlice } from "@reduxjs/toolkit";

export const { actions: nftActions, reducer: nftReducer } = createSlice({
  name: "nft",
  initialState: {
    newNftSrc: "",
  },
  reducers: {
    setNewNftSrc(state, { payload }) {
      state.newNftSrc = payload;
    },
  },
});

export const { setNewNftSrc } = nftActions;
