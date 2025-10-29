import type { Image } from "../imageSlice";

export const getFave = (): Image[] => {
  const storedFaves = localStorage.getItem("favorites");
  return storedFaves ? JSON.parse(storedFaves) : [];
};

export const saveFave = (favorites: Image[]): void => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const clearFaves = (): void => {
  localStorage.removeItem("favorites");
};
