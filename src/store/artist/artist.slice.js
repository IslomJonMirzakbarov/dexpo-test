import { createSlice } from '@reduxjs/toolkit';

export const { actions: artistActions, reducer: artistReducer } = createSlice({
  name: 'artist',
  initialState: {
    artistName: '',
    artistWalletAddress: '',
    full: null
  },
  reducers: {
    assignArtist(state, { payload }) {
      state.artistName = payload.artist_name;
      state.artistWalletAddress = payload.wallet_address;
    },
    setArtist(state, { payload }) {
      state.full = payload;
    }
  }
});

export const { assignArtist, setArtist } = artistActions;
