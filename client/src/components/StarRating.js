import React from 'react';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className="star-container" dir="rtl">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star checked"></i>
      ))}
      {[...Array(halfStar)].map((_, i) => (
        <i key={`half-${i}`} className="fas fa-star-half-alt checked"></i>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star"></i>
      ))}
    </div>
  );
};

export default StarRating;
