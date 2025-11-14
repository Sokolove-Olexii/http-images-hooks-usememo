import axios from "axios";
import { useState, useEffect, useMemo, useCallback } from "react";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";

const API_KEY = "36609011-61ae1cd37a6d0352dff5d0631";
const BASE_URL = "https://pixabay.com/api/";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(BASE_URL, {
        params: {
          q: query,
          page,
          key: API_KEY,
          per_page: 15,
          image_type: "photo",
          orientation: "horizontal",
        },
      });

      if (data.hits.length === 0 && page === 1) {
        setError("Виникла помилка");
        setIsLoading(false);
        return;
      }

      setImages((prevImages) =>
        page === 1 ? data.hits : [...prevImages, ...data.hits]
      );
      setIsLoading(false);
      setTotalHits(data.totalHits);
    } catch (error) {
      console.error("Виникла помилка", error);
      setIsLoading(false);
      setError("Помилка при завантаженні зображень. Спробуйте ще раз.");
    }
  }, [query, page]);

  useEffect(() => {
    if (!query) return;
    fetchImages();
  }, [query, page, fetchImages]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setTotalHits(0);
  };

  const selectImage = (imageURL) => {
    setSelectedImage(imageURL);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const showButton =
    images.length > 0 && !isLoading && images.length < totalHits;

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <ImageGallery images={images} onSelect={selectImage} />
      {isLoading && <Loader />}
      {showButton && <Button onClick={loadMore} />}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
