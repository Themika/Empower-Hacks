import React from 'react';
import "../CSS/modalLearn.css"; // Import your CSS file for styling

const Modal = ({ isOpen, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
