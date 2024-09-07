// src/components/Navbar.js
import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import logo from '../../../assets/LogoDark.png'
import accImg from '../../../assets/accImg2.jpeg'
const MedicalMainNav = () => {
  const navigate = useNavigate();
  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/med-home">
          <img src={logo} alt="logo" />
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ whiteSpace: 'nowrap', marginRight: '1rem' }}><b>About Us</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact"><b>Contact</b></Link>
            </li>
          </ul>

          {/* Profile Dropdown Menu */}
          <div className="dropdown ms-auto">
            <button className="btn dropdown-toggle d-flex align-items-center" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'rgb(177, 231, 240)'}}>
              <img src={accImg} alt="User" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
              <span style={{color:'black'}}>Medical Name</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
              <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

export default MedicalMainNav;
