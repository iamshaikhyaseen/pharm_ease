import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
export default function () {
  return (
    <>
        <footer className="footer">

<div className="footer-container">

  <div className="footer-section">
    <h3>About Us</h3>
    <p>We are dedicated to providing the best pharmaceutical services.</p>
  </div>

  <div className="footer-section">
    <h3>Contact</h3>
    <p>Email: support@pharmease.com</p>
    <p>Phone: +123 456 7890</p>
  </div>

  <div className="footer-section">
    <h3>Follow Us</h3>
    <div className="social-icons">
      <Link to="#"><i className="fab fa-facebook-f">facebook</i></Link>
      <Link to="#"><i className="fab fa-twitter">twitter</i></Link>
      <Link to="#"><i className="fab fa-instagram">instagram</i></Link>
    </div>
    <Link to="/admin-login">admin</Link>
  </div>

</div>

<div className="footer-bottom">
  <p>&copy; 2024 PharmEase. All Rights Reserved.</p>
</div>

</footer>
    </>
  )
}
