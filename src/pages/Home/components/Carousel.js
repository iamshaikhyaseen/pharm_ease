import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Carousel.css'

import trustImg from '../../../assets/Trust.png'
import qualityImg from '../../../assets/QualityProducts.png'
import wideImg from '../../../assets/WideNetwork.png'

import {trust,wide1,quality1} from '../../../constants/strings'

const slides = [
    {
      image: trustImg,
      heading: 'Hundreds of Medicals Trust Us',
      description: trust ,
      link: '/page1',
    },
    {
      image: qualityImg,
      heading: 'Assured Quality Products',
      description: quality1,
      link: '/page2',
    },
    {
      image: wideImg,
      heading: 'Wide Network of Medicals',
      description: wide1,
      link: '/page3',
    },
  ];
  
  export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const goToNextSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
      setIsSliding(false);
    }, 500);
  };

  const goToPreviousSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
      setIsSliding(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  return (
    <div className="carousel">
      <button onClick={goToPreviousSlide} className="carousel-button prev-button">
        &lt;
      </button>
      <div className={`carousel-slide ${isSliding ? 'sliding' : ''}`}>
        <img src={slides[currentIndex].image} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        <div className="carousel-content">
          <h2>{slides[currentIndex].heading}</h2>
          <p>{slides[currentIndex].description}</p>
          
        </div>
      </div>
      <button onClick={goToNextSlide} className="carousel-button next-button">
        &gt;
      </button>
    </div>
  );
  }