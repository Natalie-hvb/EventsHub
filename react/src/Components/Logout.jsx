import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Make an Axios request to logout endpoint on the server
        await axios.get('http://localhost:7000/logout');

        // Clear the user data from local storage (if you're storing it there)
        localStorage.removeItem('user');

        // Redirect to the home page or any other desired page after logout
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle logout error if needed
      }
    };

    // Call the logout function
    logout();
  }, [navigate]);

  return <div>Logging out...</div>; // You can add a loading spinner or message here
};

export default Logout;
