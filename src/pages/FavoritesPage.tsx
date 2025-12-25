import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import "../App.css";
import "../styles/Favorite.css";
import { useState, useEffect } from "react";
import ImageModal from "../components/modal";
import SearchBar from "../components/TopBar";
import { fetchImages } from "../store/images/actions";

interface Props {
  query: string;
}
const FavoritesPage: React.FC<Props> = ({ query }) => {
  const favorites = useSelector((state: RootState) => state.images.favorites);
  const [selected, setSelected] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredFav, setFilteredFav] = useState(favorites);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredFav(favorites);
      return;
    } else {
      const lower = query.toLowerCase();
      const base = lower.replace(/s$/, "");
      const results = favorites.filter((img) => {
        const text = (img.alt || "").toLowerCase();
        return text.includes(lower) || text.includes(base);
      });
      setFilteredFav(results);
    }
  }, [query, favorites]);

  if (favorites.length === 0) {
    return (
      <p style={{ marginTop: "40px", textAlign: "center" }}>No favorites yet</p>
    );
  }

  return (
    <div className="favorites-grid">
      {filteredFav.map((img) => (
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
