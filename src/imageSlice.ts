import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface Image {
  //defines the img type and what each object contains
  id: number;
  src: {
    small: string;
    medium: string;
    large: string;
  };
}

interface ImageState {
  //defines the state
  images: Image[]; //the thumbnails
  mainImg: Image | null;
  loading: boolean;
  favorites: Image[];
  totalResults: number;
  visibleStart: number;
  visibleEnd: number;
}

const initialState: ImageState = {
  images: [],
  mainImg: null,
  loading: false,
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  totalResults: 0,
  visibleStart: 0,
  visibleEnd: 9,
};

//fetching images from api
export const fetchImages = createAsyncThunk(
  //is an async action creator that returns a thunk action, a thunk is a function that wraps an expression to delay its evaluation
  "images/fetchImages",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`,
      {
        headers: {
          Authorization:
            "563492ad6f917000010000017f488949f5c24f7cb9fc4ad4069c1050",
        },
      }
    );
    return {
      photos: response.data.photos,
      totalResults: response.data.total_results,
    };
  }
);

//creating the slice that generates action creators for the functions in the reducers
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setMainImg(state, action: PayloadAction<Image>) {
      state.mainImg = action.payload; //sets the main image when a thumbnail is clicked
    },
    toggleFavorite(state, action: PayloadAction<Image>) {
      const existingIndex = state.favorites.find(
        (img) => img.id === action.payload.id
      );
      if (existingIndex !== undefined) {
        //if the image is already in favorites, remove it
        state.favorites = state.favorites.filter(
          (img) => img.id !== action.payload.id
        );
      } else {
        //else add it to favorites
        state.favorites.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites)); //persist favorites in local storage
    },
    deleteImg(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (img) => img.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      if (action.meta.arg.page === 1) {
        // New search to replace images
        state.images = action.payload.photos;
      } else {
        // Load more to append
        state.images = [...state.images, ...action.payload.photos];
      }

      if (!state.mainImg) state.mainImg = action.payload.photos[0];
      state.totalResults = action.payload.totalResults;
      state.loading = false;
    });

    builder.addCase(fetchImages.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setMainImg, toggleFavorite, deleteImg } = imageSlice.actions; //exporting the action creators
export default imageSlice.reducer; //exporting the reducer to be used in the store, its the actual function that changes the state
