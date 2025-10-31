import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import "../App.css";
import "../styles/Favorite.css";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.images.favorites);

  if (favorites.length === 0) {
    return <p style={{ color: "white" }}>No favorites yet</p>;
  }

  return (
    <div className="favorites-grid">
      {favorites.map((img) => (
        <img key={img.id} src={img.src.medium} className="favorite-img" />
      ))}
    </div>
  );
};

export default FavoritesPage;
