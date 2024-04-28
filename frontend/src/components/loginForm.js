import React, { useState } from 'react';

const LoginForm = ({ onLogin, onSwitchForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrors({ email: 'Email is required', password: 'Password is required' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if(response === 200){

        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setNotification('Login successful');
      onLogin();
    } catch (error) {
      console.error('Login failed:', error);
      setNotification(error.message || 'Login failed');
    }
  };

  return (
    <form className="form-group" id="login-form" onSubmit={handleLogin}>
      <label htmlFor="email-login">Email:</label>
      <input
        type="email"
        id="email-login"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <label htmlFor="password-login">Password:</label>
      <input
        type="password"
        id="password-login"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit">Login</button>

      <p className="switch-text">
        Don't have an account?{' '}
        <a href="#" id="switch-link" onClick={onSwitchForm}>
          Register
        </a>
      </p>

      {notification && <p className="notification">{notification}</p>}
    </form>
  );
};

export default LoginForm;
