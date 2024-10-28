import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/auth/user`, {
        withCredentials: true,
      })
      .then(response => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    axios
      .post(
        `http://localhost:4000/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser(null);
        console.log('Logged out successfully');
      })
      .catch(error => console.error('Logout failed:', error));
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
