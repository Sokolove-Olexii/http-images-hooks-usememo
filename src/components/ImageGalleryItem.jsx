const ImageGalleryItem = ({ smallImg, largeImg, tags = "", onSelect }) => {
  const handleClick = () => {
    onSelect(largeImg);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleClick}>
      <img src={smallImg} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
