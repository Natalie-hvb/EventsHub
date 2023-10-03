import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './App';
import { AuthProvider } from './Components/AuthComponents/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);


