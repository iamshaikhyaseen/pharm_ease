import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserTie } from "react-icons/fa";
import { IconContext } from 'react-icons';
import logo from '../../../assets/LogoTest5.png';
import accImg from '../../../assets/Icons/user-tie-solid.svg';
import profImg from '../../../assets/Icons/user-pen-solid.svg';
import logout from '../../../assets/Icons/Logout.svg'
import orders from '../../../assets/Icons/truck-solid.svg'
import './MedicalMainNav.css';  // Custom CSS for styling
import { MedicalContext } from '../../LoginPage/components/MedicalContext';

const MedicalMainNav = () => {
  const navigate = useNavigate();
  const {medicalData}=useContext(MedicalContext);
  

  const handleLogOut = () => {
    
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
        <IconContext.Provider value={{ color: "white", className: "global-class-name", size:"1.5em" }}>
  <div>
    <FaUserTie />
  </div>
</IconContext.Provider>
          <span className="profile-name">{medicalData.name}</span>
        </div>

        {isOpen && (
          <div className="dropdown">
            <ul>
              <li>
                <Link className="dropdown-item" to="/med-home/profile">
                <img src={profImg} alt=""/>
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/med-home/orders">
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
