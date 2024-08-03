import React from "react";
import PropTypes from "prop-types";
import "../CSS/Card.css"; // Import your CSS file for styling

const Card = ({ image, title, description, link, onClick }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
        Learn more
      </a>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">
          {description.substring(0, 100)}...
        </p>
        <button className="card-toggle-button" onClick={onClick}>
          Read More
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // Ensure onClick is required
};

export default Card;
