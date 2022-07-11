import { createSlice } from "@reduxjs/toolkit";

export const { actions: nftActions, reducer: nftReducer } = createSlice({
  name: "nft",
  initialState: {
    newNftItem: {},
    likeCount: 0,
  },
  reducers: {
    assignNftItem(state, { payload }) {
      state.newNftItem = payload;
    },
    addLike(state) {
      state.likeCount += 1;
    },
    assignLike(state) {
      state.likeCount = 0;
    },
  },
});

export const { assignNftItem, addLike, assignLike } = nftActions;
