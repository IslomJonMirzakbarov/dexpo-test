import { createSlice } from "@reduxjs/toolkit";

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userDescription: "",
    otherUser: {
      otherUserName: "",
      otherUserDescription: "",
      otherUserLogoUrl: "",
    },
  },
  reducers: {
    setUserName(state, { payload }) {
      state.userName = payload.userName;
    },
    setUserDesc(state, { payload }) {
      state.userDescription = payload.userDescription;
    },
    setOtherUser(state, { payload }) {
      state.otherUser = {
        otherUserName: payload.otherUserName,
        otherUserDescription: payload.otherUserDescription,
        otherUserLogoUrl: payload.otherUserLogoUrl,
      };
    },
  },
});

export const { setUserName, setUserDesc, setOtherUser } = userActions;
