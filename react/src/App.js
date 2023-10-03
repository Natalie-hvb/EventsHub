import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Update the import
import Main from './Components/MainPageComponents/Main';
// import SignUp from './SignUp';
// import Login from './Login';
// import Profile from './Profile';

function App() {
  return (
    <Routes>
      {/* <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} /> */}
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
