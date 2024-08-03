// Modal.js
import React from "react";

const Modal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Transaction Details</h2>
        <p>
          <strong>Name:</strong> {transaction.name}
        </p>
        <p>
          <strong>Amount:</strong> {transaction.amount}
        </p>
        <p>
          <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {transaction.status}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;