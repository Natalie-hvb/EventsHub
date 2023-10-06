import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Head from './Components/PartialComponents/HeadComponent/Head';
import Footer from './Components/PartialComponents/FooterComponent/Footer';
import Main from './Components/MainPageComponents/Main';
import SignUp from './Components/SignUpComponent/SignUpForm';
import Login from './Components/LoginComponent/LoginForm';
import Logout from './Components/Logout';
import Contact from './Components/ContactsComponent/Contact';
import Forum from './Components/ForumComponents/Forum';
import FullPost from './Components/ForumComponents/FullPost';
import { useAuth } from './Components/AuthComponents/AuthContext';
import EditPost from './Components/ForumComponents/EditPost';
import NotFound from './Components/NotFound';
// import Profile from './Profile';

function App() {
  const { user } = useAuth();

  return (
    <div>
      <Head />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forum" element={<Forum user={user} />} />
        <Route path="/post/:id" element={<FullPost user={user} />} />
        <Route path="/post/edit/:id" element={<EditPost />} />

        {/*<Route path="/profile" element={<Profile />} /> */}
        {/* ... other routes ... */}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;







