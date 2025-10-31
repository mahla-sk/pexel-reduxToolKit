import axios from "axios";
import type { Image, ImageState } from "./types";
import { saveToStorage, clearFromStorage } from "../../utils/StorageHelper";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchImagesService = async (query: string, page: number) => {
  const response = await axios.get(
    `${API_URL}?query=${query}&per_page=80&page=${page}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  return {
    photos: response.data.photos,
    totalResults: response.data.total_results,
  };
};

export const toggleFavoriteService = (
  favorites: Image[],
  newImage: Image
): Image[] => {
  const exists = favorites.some((img) => img.id === newImage.id);
  const updated = exists
    ? favorites.filter((img) => img.id !== newImage.id)
    : [...favorites, newImage];
  saveToStorage("favorites", updated);
  return updated;
};

export const deleteFavoriteService = (
  favorites: Image[],
  id: number
): Image[] => {
  const updated = (favorites = favorites.filter((img) => img.id !== id));
  saveToStorage("favorites", favorites);
  return updated;
};

export const clearFavoritesService = (): Image[] => {
  clearFromStorage("favorites");
  return [];
};
