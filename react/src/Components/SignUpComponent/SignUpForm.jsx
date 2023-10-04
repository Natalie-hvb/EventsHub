import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useAuth } from '../AuthComponents/AuthContext';

const SignUpForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    city: 'Amsterdam',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    surname: '',
    city: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      username: '',
      name: '',
      surname: '',
      city: '',
      email: '',
      password: ''
    });

    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:7000/signup', formData);

      // Handle the response from the backend
      if (response.data.errors) {
        setErrors(response.data.errors);
      } else if (response.data.user) {
        // Successfully signed up
        login(response.data.user);
        window.location.assign('/'); // Redirect to home page or any other page you want
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="better-together-wrapper">
      <div className="login-option text-center mt-4">
        <h3>Already have an account?</h3>
        <a className="btn btn-outline-dark" href="/login">
          Login
        </a>
      </div>

      <div className="text-center mt-4">
        {/* <img src="../public/img/signup-img.jpeg" alt="Image Description" /> */}
        <h3 className="display-4 fw-bold text-shadow">
          Join Us for Unforgettable Moments
        </h3>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={handleSubmit}
              className="border p-4 rounded bg-light-opacity"
            >
              <h2 className="sign mb-4">Sign up</h2>

              <div className="form-group">
                <label htmlFor="username" className="required">
                  Create Username:
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control custom-input"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <div className="username error">{errors.username}</div>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="required">
                    First Name:
                </label>
                <input
                    type="text"
                    name="name"
                    className="form-control custom-input"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <div className="name error">{errors.name}</div>
                </div>
                <div className="form-group">
                <label htmlFor="surname" className="required">
                    Last Name:
                </label>
                <input
                    type="text"
                    name="surname"
                    className="form-control custom-input"
                    value={formData.surname}
                    onChange={handleInputChange}
                />
                <div className="surname error">{errors.surname}</div>
                </div>

                <div className="form-group">
                <label htmlFor="city" className="required">
                    City:
                </label>
                <select
                    name="city"
                    className="form-control custom-input"
                    value={formData.city}
                    onChange={handleInputChange}
                >
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Rotterdam">Rotterdam</option>
                    <option value="Utrecht">Utrecht</option>
                    <option value="The Hague">The Hague</option>
                    <option value="Eindhoven">Eindhoven</option>
                    <option value="Other">Other</option>
                </select>
                <div className="city error">{errors.city}</div>
                </div>

                <div className="form-group">
                <label htmlFor="email" className="required">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    className="form-control custom-input"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <div className="email error">{errors.email}</div>
                </div>

                <div className="form-group">
                <label htmlFor="password" className="required">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    className="form-control custom-input"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <div className="password error">{errors.password}</div>
                </div>

              <div className="login-option text-center d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-dark text-white">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

