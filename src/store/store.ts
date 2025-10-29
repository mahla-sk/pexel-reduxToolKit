import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./images/slice.ts";

export const store = configureStore({
  reducer: {
    //controls the state slices and what app does
    images: imageReducer, //slice with the functionalities should be added in this
  },
});

export type RootState = ReturnType<typeof store.getState>; //reads the state types
export type AppDispatch = typeof store.dispatch; //writes or sends actions to the store to change the state
