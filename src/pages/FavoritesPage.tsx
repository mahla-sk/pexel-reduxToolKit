import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import "../App.css";
import "../styles/Favorite.css";
import { useState } from "react";
import ImageModal from "../components/modal";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.images.favorites);
  const [selected, setSelected] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (favorites.length === 0) {
    return <p style={{ color: "white" }}>No favorites yet</p>;
  }

  return (
    <div className="favorites-grid">
      {favorites.map((img) => (
        <img
          key={img.id}
          src={img.src.medium}
          className="favorite-img"
          onClick={(e) => {
            setSelected(img.src.large);
            setModalOpen(true);
          }}
        />
      ))}
      <ImageModal
        open={modalOpen}
        imageUrl={selected}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default FavoritesPage;
