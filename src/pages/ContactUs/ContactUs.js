import React, { useState } from "react";
import "./ContactUs.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify'; 
import MedicalMainNav from "../Home/components/MedicalMainNav";

export const ContactUs = () => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setfData({ ...fData, [name]: value });
      };

    const [fData,setfData]=useState(
        {
            name:'',
            email:'',
            subject:'',
            message:''
        }
    );

    const handleMessageClick=()=>{
        toast.success("Message sent successfully!")
        // console.log("Toast Success");
        //  setTimeout( setfData({
        //     name:'',
        //     email:'',
        //     subject:'',
        //     message:''
        // }),6000 )
    }

    return (
        <>
        <MedicalMainNav/>
      <div className="contact-container">
        <ToastContainer position="bottom-right" autoClose={3000}/>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us through any of the methods below.</p>
  
        <div className="contact-info">
          <div>
            <FaMapMarkerAlt className="icon" />
            <p>123 PharmEase Street, Healthcare City, India</p>
          </div>
          <div>
            <FaPhoneAlt className="icon" />
            <p>+91 98765 43210</p>
          </div>
          <div>
            <FaEnvelope className="icon" />
            <p>support@pharmease.com</p>
          </div>
        </div>
  
        <form className="contact-form">
          <input type="text" name="name" id="name" value={fData.name} placeholder="Your Name"  onChange={handleInputChange}/>
          <input type="email" name="email" id="email" value={fData.email} placeholder="Your Email"  onChange={handleInputChange}/>
          <input type="text" name="subject" id="subject" value={fData.subject} placeholder="Subject"  onChange={handleInputChange}/>
          <textarea placeholder="Your Message" id="message" value={fData.message} name="message" rows="5"  onChange={handleInputChange}></textarea>
          <button type="submit" onClick={handleMessageClick}>Send Message</button>
        </form>
      </div>
      </>
    );
  };
  
