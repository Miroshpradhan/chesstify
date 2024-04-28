import React, { useState } from 'react';

const SignUpForm = ({ onSignUp, onSwitchForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/User/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
        
      });
  
      if (response.status === 201) {
        setNotification('Registration successful');
      } else {
        setNotification('Registration failed');
      }
    } catch (error) {
      setNotification('Registration failed');
    }
  };
  


  return (
    <div>
      {notification && <p>{notification}</p>}
      <form className="form-group" id="signup-form" onSubmit={handleSignUp}>
        <label htmlFor="name-signup">Full Name:</label>
        <input
          type="text"
          id="name-signup"
          name="name"
          placeholder="Choose a name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email-signup">Email:</label>
        <input
          type="email"
          id="email-signup"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password-signup">Password:</label>
        <input
          type="password"
          id="password-signup"
          name="password"
          placeholder="Choose a password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirm-password-signup">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password-signup"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <p className="switch-text">
          Already have an account?{' '}
          <a href="#" id="switch-link" onClick={onSwitchForm}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
