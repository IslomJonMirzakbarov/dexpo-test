import { createSlice } from "@reduxjs/toolkit";

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userDescription: "",
    otherUserInfo: {
      otherUserName: "",
      otherUserDescription: "",
      otherUserLogoUrl: "",
      otherUserId: "",
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
      state.otherUserInfo = {
        otherUserName: payload.otherUserName,
        otherUserDescription: payload.otherUserDescription,
        otherUserLogoUrl: payload.otherUserLogoUrl,
        otherUserId: payload.otherUserId,
      };
    },
  },
});

export const { setUserName, setUserDesc, setOtherUser } = userActions;
