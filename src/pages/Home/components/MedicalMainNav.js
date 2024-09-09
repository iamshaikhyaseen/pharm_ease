import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/LogoDark.png';
import accImg from '../../../assets/Icons/user-tie-solid.svg';
import profImg from '../../../assets/Icons/user-pen-solid.svg';
import logout from '../../../assets/Icons/Logout.svg'
import orders from '../../../assets/Icons/truck-solid.svg'
import './MedicalMainNav.css';  // Custom CSS for styling

const MedicalMainNav = () => {
  const navigate = useNavigate();
  const medicalNameData = localStorage.getItem('medicalName');

  const handleLogOut = () => {
    localStorage.removeItem('medicalName');
    navigate('/');
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="left-section">
        <Link className="navbar-logo" to="/med-home">
          <img src={logo} alt="logo" />
        </Link>
        <div className="navbar-links">
          <Link className="nav-link" to="/about">
            About Us
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </div>
      </div>

      <div className="profile-section" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
        <div className="profile-button">
          <img src={accImg} alt="Profile" className="profile-img" />
          <span className="profile-name">{medicalNameData}</span>
        </div>

        {isOpen && (
          <div className="dropdown">
            <ul>
              <li>
                <Link className="dropdown-item" to="/profile">
                <img src={profImg} alt=""/>
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                <img src={orders} alt="" />
                  Orders
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogOut}>
                  <img src={logout} alt="" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MedicalMainNav;
