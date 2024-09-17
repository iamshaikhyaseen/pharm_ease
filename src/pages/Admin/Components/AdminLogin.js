import React, { useState, useContext } from 'react';
import api from '../../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { AdminContext } from './AdminContext'; // Using AdminContext for session management

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAdmin } = useContext(AdminContext);  // Admin context to set admin session
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admins/login', { email, password });
      if (response.status === 200) {
        setAdmin(response.data);  // Store admin details globally
        navigate('/admin-dashboard');  // Redirect to admin dashboard
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
