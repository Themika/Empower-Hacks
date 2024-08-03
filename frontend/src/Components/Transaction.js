import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../CSS/Transaction.css";

const TransactionCard = ({ image, name, amount, date, status: initialStatus, id, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedAmount, setEditedAmount] = useState(amount);
    const [status, setStatus] = useState(initialStatus);
    const cardRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsEditing(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCardClick = () => {
        setIsEditing(true);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSaveClick = async () => {
        try {
            if (typeof onSave === 'function') {
                await onSave(id, editedName, editedAmount, status);
            }
            setIsEditing(false);
        } catch (error) {
            console.error('There was a problem with the PATCH request:', error);
        }
    };

    return (
        <div
            className={`transaction-card ${isEditing ? 'editing' : ''}`}
            id={`transaction-card-${id}`}
            ref={cardRef}
        >
            <img src={image} alt="Transaction" className="transaction-image" />
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Enter title"
                    />
                    <input
                        type="number"
                        value={editedAmount}
                        onChange={(e) => setEditedAmount(parseFloat(e.target.value) || 0)}
                        placeholder="Enter amount"
                    />
                    <select value={status} onChange={handleStatusChange}>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <div className="view-mode" onClick={handleCardClick}>
                    <div className="transaction-details">
                        <span className="transaction-name">{name}</span>
                        <span className="transaction-date">{date}</span>
                    </div>
                    <div className="transaction-amount-status">
                        <span className="transaction-amount">${amount.toFixed(2)}</span>
                        <span className={`transaction-status ${status ? status.toLowerCase() : 'unknown'}`}>
                            {status || 'Unknown'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

TransactionCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default TransactionCard;
