import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFromStorage } from "../../utils/StorageHelper";
import { fetchImages } from "./actions";
import {
  clearFavoritesService,
  deleteFavoriteService,
  toggleFavoriteService,
} from "./services";
import type { Image, ImageState } from "./types";

const initialState: ImageState = {
  images: [],
  mainImg: null,
  loading: false,
  favorites: getFromStorage<Image[]>("favorites", []), //retrieving favorites from local storage
  totalResults: 0,
  visibleStart: 0,
  visibleEnd: 9,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setMainImg(state, action: PayloadAction<Image>) {
      state.mainImg = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<Image>) {
      state.favorites = toggleFavoriteService(state.favorites, action.payload);
    },
    deleteImg(state, action: PayloadAction<number>) {
      state.favorites = deleteFavoriteService(state.favorites, action.payload);
    },
    unlikedImg(state) {
      state.favorites = clearFavoritesService();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.images = action.payload.photos;
          state.mainImg = action.payload.photos[0];
        } else {
          state.images = [...state.images, ...action.payload.photos];
        }

        if (!state.mainImg) state.mainImg = action.payload.photos[0];
        state.totalResults = action.payload.totalResults;
        state.loading = false;
      })
      .addCase(fetchImages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setMainImg, toggleFavorite, deleteImg, unlikedImg } =
  imageSlice.actions;

export default imageSlice.reducer;
