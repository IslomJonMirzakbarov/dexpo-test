import { createSlice } from "@reduxjs/toolkit";

export const { actions: collectionActions, reducer: collectionReducer } =
  createSlice({
    name: "collection",
    initialState: {
      newCollection: {},
    },
    reducers: {
      assignNewCollection(state, { payload }) {
        state.newCollection = payload;
      },
    },
  });

export const { assignCollectionList, assignNewCollection } = collectionActions;
