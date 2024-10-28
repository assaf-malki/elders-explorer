import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TextSizeContext = createContext();

export function useTextSize() {
  return useContext(TextSizeContext);
}

export const TextSizeProvider = ({ children }) => {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1); // Default multiplier is 1

  useEffect(() => {
    const baseSize = 20; // Base font size in pixels
    const newSize = baseSize * fontSizeMultiplier;
    document.documentElement.style.fontSize = `${newSize}px`; // Apply to html for overall scaling
  }, [fontSizeMultiplier]);

  return (
    <TextSizeContext.Provider
      value={{ fontSizeMultiplier, setFontSizeMultiplier }}
    >
      {children}
    </TextSizeContext.Provider>
  );
};

TextSizeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
