import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is already logged in 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('Login function called');

    try {
      const response = await axios.post('http://localhost:7000/login', {
        email,
        password,
      });
      const userData = response.data.userData;
      localStorage.setItem( 'usertoken', response.data.token )
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  const logout = async () => {
    try {
      await axios.get('http://localhost:7000/logout');
      localStorage.removeItem('user');
      localStorage.removeItem( 'usertoken' )
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const contextValue = { user, login, logout };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth, AuthContext };
