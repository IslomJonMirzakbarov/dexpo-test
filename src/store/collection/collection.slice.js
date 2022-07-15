import { createSlice } from "@reduxjs/toolkit";

export const { actions: collectionActions, reducer: collectionReducer } =
  createSlice({
    name: "collection",
    initialState: {
      collectionList: [],
      newCollection: {},
    },
    reducers: {
      assignCollectionList(state, { payload }) {
        state.collectionList = payload;
      },
      assignNewCollection(state, { payload }) {
        state.newCollection = payload;
      },
    },
  });

export const { assignCollectionList, assignNewCollection } = collectionActions;
