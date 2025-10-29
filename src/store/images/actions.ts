import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImagesService } from "./services";

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async ({ query, page }: { query: string; page: number }) => {
    const data = await fetchImagesService(query, page);
    return data;
  }
);
