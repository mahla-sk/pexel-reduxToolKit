import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface Image {
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
}

const initialState: ImageState = {
  images: [],
  mainImg: null,
  loading: false,
};

//fetching images from api
export const fetchImages = createAsyncThunk(
  //is an async action creator that returns a thunk action, a thunk is a function that wraps an expression to delay its evaluation
  "images/fetchImages",
  async (query: string) => {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
      {
        headers: {
          Authorization:
            "563492ad6f917000010000017f488949f5c24f7cb9fc4ad4069c1050",
        },
      }
    );
    return response.data.photos;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload;
      state.mainImg = action.payload[0];
      state.loading = false;
    });
    builder.addCase(fetchImages.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setMainImg } = imageSlice.actions; //exporting the action creators
export default imageSlice.reducer; //exporting the reducer to be used in the store, its the actual function that changes the state
