import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchImagesService = async (query: string, page: number) => {
  const response = await axios.get(
    `${API_URL}?query=${query}&per_page=10&page=${page}`,
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
