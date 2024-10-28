import React, { createContext, useContext, useState, useEffect } from 'react';

const ContrastContext = createContext();

export function useContrast() {
  return useContext(ContrastContext);
}

export const ContrastProvider = ({ children }) => {
  const [isHighContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isHighContrast
      ? '#343a40'
      : '#dae6f7';
    // Optionally, update text color or other properties
    document.body.style.color = isHighContrast ? '#fff' : '#000';
  }, [isHighContrast]);

  return (
    <ContrastContext.Provider value={{ isHighContrast, setHighContrast }}>
      {children}
    </ContrastContext.Provider>
  );
};
