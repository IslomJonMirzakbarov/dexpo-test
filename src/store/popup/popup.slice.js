import { createSlice } from '@reduxjs/toolkit';

export const { actions: popupActions, reducer: popupReducer } = createSlice({
  name: 'popup',
  initialState: {
    isProfileOpen: false
  },
  reducers: {
    toggleProfilePopup: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    }
  }
});

export const { toggleProfilePopup } = popupActions;
