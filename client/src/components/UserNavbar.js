import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useUser } from '../contexts/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useContrast } from '../contexts/ContrastContext'; // Ensure this import is correct

const UserNavbar = () => {
  const { user, logout } = useUser();
  const { isHighContrast } = useContrast(); // Using the useContrast hook
  const navigate = useNavigate(); // Initialize the navigate function

  // Only apply the dark mode styles to dropdown content and label
  const dropdownStyle = {
    backgroundColor: isHighContrast ? '#343a40' : undefined, // Dark background for high contrast mode
    color: isHighContrast ? '#fff' : undefined, // Light text for high contrast mode
    cursor: 'pointer', // Add cursor pointer style
  };

  // Custom styles for handling specific dark mode adjustments
  const customStyles = `
    .navbar-dark .navbar-nav .nav-link {
      color: ${isHighContrast ? '#fff' : 'rgba(0,0,0,.5)'};
    }
    .navbar-dark .navbar-nav .dropdown-menu {
      background-color: ${isHighContrast ? '#343a40' : '#fff'};
      max-height: 270px;
      overflow-y: auto;
    }
    .navbar-dark .navbar-nav .dropdown-menu .dropdown-divider {
      border-top-color: ${isHighContrast ? '#666' : '#e5e5e5'};
    }
    .navbar-dark .navbar-nav .dropdown-toggle::after {
      border-top-color: ${isHighContrast ? '#fff' : '#000'};
    }
  `;

  const handleHobbyClick = hobby => {
    if (hobby === 'שעת חירום') {
      navigate('/emergency');
    } else if (hobby === 'בנקים') {
      navigate('/banks');
    } else if (hobby === 'קופות חולים') {
      navigate('/hmos');
    } else {
      navigate(`/places-of-interest/${encodeURIComponent(hobby)}`);
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <Navbar
        className="user-navbar justify-content-end navbar-dark"
        expand="lg"
      >
        <Nav className="flex-column align-items-end">
          <Button variant="outline-primary" className="mb-2" onClick={logout}>
            התנתקות
          </Button>
          <Button
            variant="outline-primary"
            className="mb-2"
            as={Link}
            to="/update-info"
          >
            עדכון פרטים
          </Button>
          <NavDropdown
            title={<span style={dropdownStyle}>תפריט</span>} // Apply dark mode styling to the dropdown label
            id="basic-nav-dropdown"
            className="rtl-dropdown"
          >
            <NavDropdown.Item as={Link} to="/user-home" style={dropdownStyle}>
              דף הבית
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {user?.hobbies.map(hobby => (
              <NavDropdown.Item
                as="span"
                onClick={() => handleHobbyClick(hobby)}
                key={hobby}
                style={dropdownStyle}
              >
                {hobby}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item
              eventKey="logout"
              onClick={logout}
              style={dropdownStyle}
            >
              התנתקות
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
};

export default UserNavbar;
