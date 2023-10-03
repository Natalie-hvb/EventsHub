import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useAuth } from '../AuthComponents/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
  
    try {
      console.log({ email, password });
      const response = await axios.post('http://localhost:7000/login', { email, password });

  
      if (response.data.error) {
        // Handle API errors
        setEmailError(response.data.error.email);
        setPasswordError(response.data.error.password);
      } else if (response.data.user) {
        
        login(response.data.user);
        window.location.assign('/');
      } else {
        
        console.error('Unexpected response format:', response.data);
      }
    } catch (err) {
      console.error('API request failed:', err);
    }
  };

  return (
    <section className="intro">
      <div className="bg-image h-100">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-lg-12 col-xl-10">
                <div className="card" style={{ borderRadius: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-xl-4 d-md-block">
                    <img src="/img/logo.jpg" alt="Logo" className="img-fluid" />

                    </div>
                    <div className="col-md-6 col-xl-6 d-flex align-items-center">
                      <div className="card-body py-5 px-4 p-md-5">
                        <form onSubmit={handleSubmit}>
                          <h4 className="fw-bold mb-4" style={{ color: 'whitesmoke' }}>Log in to your account</h4>

                          <div className="form-outline mb-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                              type="text"
                              name="email"
                              id="form2Example1"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="email error text-danger">{emailError}</div>
                          </div>

                          <div className="form-outline mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                              type="password"
                              name="password"
                              id="form2Example2"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="password error text-danger">{passwordError}</div>
                          </div>
                          <button type="submit" className="btn btn-outline-light">Login</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
