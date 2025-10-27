import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice.ts";

export const store = configureStore({
  reducer: {
    //controls the state slices and what app does
    images: imageReducer, //slice with the functionalities should be added here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
