import React,{useState} from 'react'
import './LoginForm.css'
import api from '../../../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/LogoDark.png'
import loginImg from '../../../assets/Light Background Wallpaper.jpg'
export default function() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
          const response = await api.post('/medicals/login', {
              email: email,
              password: password
          });

          if (response.status === 200) {
            
              alert('Login successful!');
              navigate("/med-home")
          }
      } catch (err) {
          alert('Login Failed');
          setError('Invalid email or password');
          console.log(err);
      }
  };

  return (
    <>
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <img src={logo} alt="logo" className="login-logo" />
          <h3 className="login-title">Log in as Medical</h3>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="form-label">Email</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                id="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="form-label">Password</label>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="login-links">
            <Link to="#!" className="forgot-password">Forgot password?</Link>
            <p>Don't have an account? <Link to="/medical-register" className="register-link">Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
