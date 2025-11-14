import { useCallback, useEffect } from "react";

const Modal = ({ onClose, image }) => {
  const handleEsc = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleEsc]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={image} alt="#" />
      </div>
    </div>
  );
};

export default Modal;
