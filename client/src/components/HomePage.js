import React from 'react';
import { useContrast } from '../contexts/ContrastContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const { isHighContrast } = useContrast();
  const themeClass = isHighContrast ? 'bg-dark text-white' : '';

  return (
    <div className={`container text-center py-5 ${themeClass}`}>
      <header className="mb-4">
        <h1 className="mb-2">ברוכים הבאים לאתר</h1>
        <h1 className="mb-3 comic-sans">Elders Explore</h1>
        <p className="lead">
          כאן תוכלו לחפש ולמצוא מידע בנושאים המעניינים אתכם בקלות ובמהירות
        </p>
      </header>
      <div>
        <Link to="/register" className="btn btn-primary mx-2">
          להרשמה לחצו כאן
        </Link>
        <Link to="/login" className="btn btn-secondary mx-2">
          להתחברות לחצו כאן
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
