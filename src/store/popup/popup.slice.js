import { createSlice } from '@reduxjs/toolkit';

export const { actions: popupActions, reducer: popupReducer } = createSlice({
  name: 'popup',
  initialState: {
    isProfileOpen: false,
    submittedPopup: false,
    sentPopup: false,
    rejectedPopup: false,
    connectionPopup: false,
    checkoutPopup: false
  },
  reducers: {
    toggleProfilePopup: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },
    togglePopupByKey: (state, { payload }) => {
      state[payload] = !state[payload];
    }
  }
});

export const { toggleProfilePopup, togglePopupByKey } = popupActions;
