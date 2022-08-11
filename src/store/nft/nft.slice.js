import { createSlice } from "@reduxjs/toolkit";

export const { actions: nftActions, reducer: nftReducer } = createSlice({
  name: "nft",
  initialState: {
    likedNfts: [],
  },
  reducers: {
    setLikedNfts(state, { payload }) {
      state.likedNfts.push(payload);
    },
    setDislikedNfts(state, { payload }) {
      state.likedNfts = state.likedNfts.filter((item) => item !== payload);
    },
  },
});

export const { setLikedNfts, setDislikedNfts } = nftActions;
