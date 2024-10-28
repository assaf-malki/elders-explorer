import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useContrast } from '../contexts/ContrastContext'; // Ensure this is imported correctly
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CardButton = ({ hobby }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { isHighContrast } = useContrast();
  const [isHovered, setIsHovered] = useState(false);

  const normalBackground = isHighContrast ? '#333' : '#fff';
  const normalColor = isHighContrast ? '#fff' : '#333';
  const hoverBackground = isHighContrast ? '#fff' : '#333';
  const hoverColor = isHighContrast ? '#333' : '#fff';

  const cardButtonStyle = {
    backgroundColor: isHovered ? hoverBackground : normalBackground,
    color: isHovered ? hoverColor : normalColor,
    boxShadow: isHighContrast
      ? '0 4px 8px rgba(255, 255, 255, 0.1)'
      : '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust shadow color
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  // Function to handle button click
  const handleClick = () => {
    if (hobby === 'שעת חירום') {
      navigate('/emergency'); // Navigate to the emergency page
    } else if (hobby === 'בנקים') {
      navigate('/banks'); // Navigate to the banks page
    } else if (hobby === 'קופות חולים') {
      navigate('/hmos');
    } else {
      navigate(`/places-of-interest/${encodeURIComponent(hobby)}`); // Navigate to PlacesOfInterest with the hobby as a parameter
    }
  };

  return (
    <Button
      style={cardButtonStyle}
      className="card-button"
      variant="dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick} // Add click event handler
    >
      {hobby}
    </Button>
  );
};

export default CardButton;
