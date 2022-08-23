import { createSlice } from "@reduxjs/toolkit";

export const { actions: nftActions, reducer: nftReducer } = createSlice({
  name: "nft",
  initialState: {
    likedNfts: [],
    newNftSrc: "",
  },
  reducers: {
    setLikedNfts(state, { payload }) {
      state.likedNfts.push(payload);
    },
    setDislikedNfts(state, { payload }) {
      state.likedNfts = state.likedNfts.filter((item) => item !== payload);
    },
    setNewNftSrc(state, { payload }) {
      state.newNftSrc = payload;
    },
  },
});

export const { setLikedNfts, setDislikedNfts, setNewNftSrc } = nftActions;
