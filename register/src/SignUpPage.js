// SignUpPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './SUP.css';

const SignUpPage = ({ onSuccessfulRegistration }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to the server
      const response = await axios.post('http://localhost:3001', formData);

      // Handle successful registration
      if (response.status === 200) {
        // Clear the form fields upon successful registration
        setFormData({
          name: '',
          email: '',
          password: '',
          rememberMe: false,
        });

        // Callback to notify the parent component (App.js) about successful registration
        onSuccessfulRegistration();
      } else {
        // Handle registration failure
        console.error('Registration failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="logo-section">
        <img src={process.env.PUBLIC_URL + '/Group18.png'} alt="Logo" className="logo" />
        </div>
        <div>
          <h2 className='sp'>SIGN UP</h2>
          <p className='par'>Create an account to get started</p>
        </div>
        
        <button type="button" className="google-button">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGik2kBURZcyVuaheXB6S2ElrOXDxvdEnzcJ71dAtaeg&s" alt="Google Logo" className="google-logo" />
          Continue With Google
        </button>
        <div className="line-divider">
          <span> Or </span>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="label">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="input" />
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit" className="button">Register</button>
        <p className='log'>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
      <img src={process.env.PUBLIC_URL + '/free-photo-black-grunge-background-pattern-wallpaper.png'} alt="Contact" />
    </div>
  );
};

export default SignUpPage;
