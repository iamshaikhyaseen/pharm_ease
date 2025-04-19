import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import heroImg from "../../assets/LogoTest5.png";
import wide from '../../assets/WideNetwork.png'
import quality from '../../assets/QualityProducts.png'
import trustus from '../../assets/Trust.png'
import './components/Footer'
import Footer from "./components/Footer";
import { wide1 } from "../../constants/strings";
import { quality1 } from "../../constants/strings";
import { trust } from "../../constants/strings";

const LandingPage = () => {
  return (
    <>
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-text"
        >
          <h1>Welcome to PharmEase</h1>
          <p>Your Trusted Pharmaceutical Platform</p>
          <Link to="/medical-login" className="btn btn-primary">Get Started</Link>
        </motion.div>
        <motion.img
          src={heroImg}
          alt="PharmEase"
          className="hero-img"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card left">
          <img src={wide} alt="Wide Network" className="feature-img" />
          <div className="feature-text">
            <h2>Wide Network of Medicals</h2>
            <p>{wide1}</p>
          </div>
        </div>

        <div className="feature-card right">
        <img src={quality} alt="Quality Products" className="feature-img" />
          <div className="feature-text">
            <h2>Quality Products</h2>
            <p>{quality1}</p>
          </div>
          
        </div>

        <div className="feature-card left">
          <img src={trustus} alt="Trusted by Medicals" className="feature-img" />
          <div className="feature-text">
            <h2>They Trust Us</h2>
            <p>{trust}</p>
          </div>
        </div>
      </section>
      
    </div>
    <Footer/>
    </>
  );
};

export default LandingPage;
