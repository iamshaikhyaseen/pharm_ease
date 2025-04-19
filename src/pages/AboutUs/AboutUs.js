import React from "react";
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>About PharmEase</h1>
      <p>
        PharmEase is a revolutionary platform designed to streamline
        pharmaceutical business operations, connecting multiple medical
        pharmacies with a single drug dealer. Our goal is to ensure the
        **availability of quality medicines** while enhancing efficiency and trust
        between stakeholders.
      </p>
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To bridge the gap between medical suppliers and pharmacists,
          providing **a seamless digital experience** that ensures quick,
          hassle-free transactions and deliveries.
        </p>
      </div>
      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔ Wide Network of Medicals</li>
          <li>✔ Quality & Certified Medicines</li>
          <li>✔ Secure & Transparent Transactions</li>
          <li>✔ Easy-to-Use & Efficient</li>
        </ul>
      </div>
    </div>
  );
};