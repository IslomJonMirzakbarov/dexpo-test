import { createSlice } from "@reduxjs/toolkit";

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userDescription: "",
  },
  reducers: {
    setUserName(state, { payload }) {
      state.userName = payload.userName;
    },
    setUserDesc(state, { payload }) {
      state.userDescription = payload.userDescription;
    },
  },
});

export const { setUserName, setUserDesc } = userActions;
