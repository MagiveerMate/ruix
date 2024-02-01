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
          <img src="https://s3-alpha-sig.figma.com/img/4c00/f65c/117e173de0e27b429d13005853bff085?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IXiZZOUhZz0we2foQFiUshr~dtEjv0maUaS2tW-xNRFLZ8K-6HlLho912bpF3Ld002HTtbVQFCe9jNse81djCf~NTQ3MqDKIIluv67RatLrLBtEwERTaXGrMYSXEelHNPxYOqoUKP5256rtkdlWGPfcUq7QyVI7kp4D8t2GsHCaezkgdvgPCghtzwrNWb0qkEQX8xJApb-ldlL5wMiKM271YXAOKsmiKIG9KbM3GbqepWq1CIa9PUdfj1-~0~Sv~12OwRHMaw9coKy3FCMPxZyTp6KEuEEyacir4GG5gFMhGDFf6ri90gluKMdFHQ5tV7cFZ9KolrDTbnanzErCMxg__" alt="Logo" className="logo" />
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
      <img src="https://s3-alpha-sig.figma.com/img/1bc7/e2b6/5a26b88d0d4ca203495f3a92d9171247?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EXfqA4tLRHBzyOxImcQ9ZqL5W0hA-iDNMtUIr8vFCUzczjK4XcHEPzRZ60ar7otokGXKpqVrJ03aju1o9wqtSQlnSG3o5U8tooG0l1uaADtTHL6n3U33fiE~42xBWeYd2d6i2Y9DyqFeqFNdCUBtmlQEFTMqTmL8w15aRz8pCACphGKU1y9Kk6mpyklYNLtBvla2C7v265StP~zwkw35TvlV5FptWnwVMTQWLVN8zqah2AZGYTC9L2vhHKNGpYVMVmLY7UinHrUn3XkZDALHvjSDmx0pJgP8KS89qhSIbDKlxq8LH4xLqCBZw1IU1bsjDNmyS3KPTMEtSk0pABVncw__" alt="contact " />
    </div>
  );
};

export default SignUpPage;
