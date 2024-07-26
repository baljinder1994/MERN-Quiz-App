import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      console.log('Login response:', res.data); // Debugging line
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Redirect or handle successful login
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p> {/* Register link */}
    </div>
  );
};

export default Login;
