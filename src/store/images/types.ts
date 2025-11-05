export interface Image {
  //defines the img type and what each object contains
  id: number;
  src: {
    small: string;
    medium: string;
    large: string;
  };
  alt: string;
}

export interface ImageState {
  //defines the state
  images: Image[]; //the thumbnails
  mainImg: Image | null;
  loading: boolean;
  favorites: Image[];
  totalResults: number;
  visibleStart: number;
  visibleEnd: number;
}
