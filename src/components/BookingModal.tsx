import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

const BookingModal: React.FC<ModalProps> = ({ onClose, isOpen, children }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <button className="modal-close" onClick={onClose}>
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;