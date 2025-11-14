import ImageGalleryItem from "./ImageGalleryItem";
import { useMemo } from "react";

const ImageGallery = ({ images, onSelect }) => {
  const memoizedImages = useMemo(() => {
    return images.map(({ id, webformatURL, largeImageURL }, index) => (
      <ImageGalleryItem
        key={`${id}-${index}`}
        onSelect={onSelect}
        largeImg={largeImageURL}
        smallImg={webformatURL}
      />
    ));
  }, [images, onSelect]);

  return <ul className="ImageGallery">{memoizedImages}</ul>;
};

export default ImageGallery;
