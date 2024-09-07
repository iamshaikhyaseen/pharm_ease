import React from 'react'
import './LandingPage.css'
import Carousel from '../Home/components/Carousel'
import ZigZagCont from './components/ZigZagCont'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar/>
      
      <ZigZagCont/>
      <Footer/>
      
    </>
  )
}
