import { createSlice } from "@reduxjs/toolkit";

export const { actions: artistActions, reducer: artistReducer } = createSlice({
  name: "artist",
  initialState: {
    artistName: "",
    artistWalletAddress: "",
  },
  reducers: {
    assignArtist(state, { payload }) {
      state.artistName = payload.artist_name;
      state.artistWalletAddress = payload.wallet_address;
    },
  },
});

export const { assignArtist } = artistActions;
