import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import HomePage from './components/HomePage';
import UserHomePage from './components/UserHomePage';
import AccessibilityFeatures from './components/AccessibilityFeatures';
import { TextSizeProvider } from './contexts/TextSizeContext';
import { ContrastProvider } from './contexts/ContrastContext';
import RegistrationForm from './components/RegistrationForm';
import { UserProvider, useUser } from './contexts/UserProvider';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import UserNavbar from './components/UserNavbar';
import PlacesOfInterest from './components/PlacesOfInterest';
import EmergencyPage from './components/EmergencyPage';
import BanksPage from './components/BanksPage';
import HmosPage from './components/HmosPage';

axios.defaults.withCredentials = true; // Enable credentials globally for all requests

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

function NavbarController() {
  const { user } = useUser();
  const location = useLocation();
  const showNavbar = user?.username && location.pathname !== '/update-info';
  return showNavbar ? <UserNavbar /> : null;
}

function App() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ContrastProvider>
      <TextSizeProvider>
        <Router>
          <div className="container">
            <div className="top-bar-container">
              {' '}
              {/* New container for top bar elements */}
              <AccessibilityFeatures />
              <NavbarController />
            </div>
            <Routes>
              {!user?.username ? (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/user-home" element={<UserHomePage />} />
                  <Route
                    path="/update-info"
                    element={<RegistrationForm initialData={user} />}
                  />
                  <Route path="/banks" element={<BanksPage />} />
                  <Route path="/hmos" element={<HmosPage />} />
                  <Route path="/emergency" element={<EmergencyPage />} />
                  <Route
                    path="/places-of-interest/:hobby"
                    element={<PlacesOfInterest />}
                  />
                  <Route
                    path="*"
                    element={<Navigate replace to="/user-home" />}
                  />
                </>
              )}
            </Routes>
          </div>
          <footer className="fs-4" dir="rtl">
            <span className="fs-3">&#128381;</span> לכל שאלה ניתן להתקשר לטלפון:
            03-7674691 |<span> ✉️מייל: </span>
            <a href="mailto:helpdesk@gmail.com">helpdesk@gmail.com</a>
          </footer>
        </Router>
      </TextSizeProvider>
    </ContrastProvider>
  );
}

export default AppWrapper;
