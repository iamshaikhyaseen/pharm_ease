import React from 'react'
import './Footer.css'

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
      <a href="#"><i className="fab fa-facebook-f">facebook</i></a>
      <a href="#"><i className="fab fa-twitter">twitter</i></a>
      <a href="#"><i className="fab fa-instagram">instagram</i></a>
    </div>
  </div>

</div>

<div className="footer-bottom">
  <p><hr />&copy; 2024 PharmEase. All Rights Reserved.</p>
</div>

</footer>
    </>
  )
}
