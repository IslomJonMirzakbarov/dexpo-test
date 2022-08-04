import { createSlice } from "@reduxjs/toolkit";

export const { actions: myPageActions, reducer: myPageReducer } = createSlice({
   name: "my-page",
   initialState: {
      createdTab: "",
   },
   reducers: {
      setSelectedTab: (state, { payload }) => {
         state.createdTab = payload;
      },
   },
});

export const { setSelectedTab } = myPageActions;
