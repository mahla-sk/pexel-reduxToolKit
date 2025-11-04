import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMainImg,
  toggleFavorite,
  deleteImg,
  unlikedImg,
} from "../store/images/slice";
import type { AppDispatch } from "../store/store";
import type { Image } from "../store/images/types";
import type { RootState } from "../store/store";
import { Carousel } from "antd";
import "../styles/Home.css";
import ImageModal from "../components/modal";

interface imageProps {
  images: Image[];
  mainImg: Image | null;
  loading: boolean;
  totalResults: number;
  query: string;
  page: number;
  setPage: (page: number) => void;
}

const Home: React.FC<imageProps> = ({ images, mainImg, loading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.images.favorites);
  const [selected, setSelected] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isDragging = useRef(false);

  return (
    <div className="allImg">
      <h1 className="top-title">Pexels photos</h1>

      <div className="thumbnails">
        {loading ? (
          <p className="no-img">Loading...</p>
        ) : mainImg ? (
          <Carousel
            dots
            arrows
            infinite={false}
            draggable
            beforeChange={() => (isDragging.current = true)}
            afterChange={() =>
              setTimeout(() => (isDragging.current = false), 40)
            }
          >
            {(() => {
              const chunkArray = (arr: Image[], size: number) => {
                const result = [];
                for (let i = 0; i < arr.length; i += size) {
                  result.push(arr.slice(i, i + size));
                }
                return result;
              };

              const slides = window.innerWidth < 768 ? 1 : 4;
              const groupedImages = chunkArray(images, slides);

              return groupedImages.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    {group.map((img) => {
                      const isFavorite = favorites.some(
                        (fav) => fav.id === img.id
                      );

                      return (
                        <div
                          key={img.id}
                          className="thumbnail-wrapper"
                          style={{
                            position: "relative",
                            width: 332,
                            height: 420,
                            borderRadius: 13,
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            if (!isDragging.current) {
                              //not to open when scrolling slides
                              setSelected(img.src.large);
                              setModalOpen(true);
                            }
                          }}
                        >
                          <img
                            src={img.src.large}
                            alt={img.id.toString()}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />

                          <button
                            className="fav-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(toggleFavorite(img));
                            }}
                            style={{
                              position: "absolute",
                              top: 6,
                              right: 6,
                              background: "none",
                              border: "none",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          >
                            {isFavorite ? "❤️" : "🩶"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
          </Carousel>
        ) : (
          <p className="no-img">No image selected</p>
        )}
      </div>

      <ImageModal
        open={modalOpen}
        imageUrl={selected}
        onClose={() => setModalOpen(false)}
      />

      <div className="text-wrapper">
        <button className="unlike" onClick={() => dispatch(unlikedImg())}>
          Unlike all
        </button>
        <h3 className="fav-text">Your Favorites</h3>
      </div>

      {favorites.length > 0 ? (
        <div className="favorites-wrapper">
          <div className="favorites">
            {favorites.map((img) => (
              <div key={img.id} className="fav-wrapper">
                <img
                  key={img.id}
                  src={img.src.small}
                  onClick={() => dispatch(setMainImg(img))}
                />
                <button
                  className="eliminate"
                  onClick={() => dispatch(deleteImg(img.id))}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="no-fave">No favorites yet!</p>
      )}
    </div>
  );
};

export default Home;
