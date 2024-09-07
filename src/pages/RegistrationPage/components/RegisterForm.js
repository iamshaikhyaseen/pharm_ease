// src/components/MedicalRegistration.js
import React, { useState } from 'react';
import './RegisterForm.css';
import api from '../../../axiosConfig'
import { useNavigate } from 'react-router-dom';

const MedicalRegistration = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    medicalName: '',
    medicalDlno: '',
    medicalGstin: '',
    medicalRegion: '',
    medicalPassword: '',
    confirmPassword: '',
    medicalAddress:'',
    medicalEmail:''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    

    if (!formData.medicalName.trim()) {
        newErrors.medicalName = 'Medical Name is required.';
      }

    const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
    if (!formData.medicalGstin) {
      newErrors.gstIn = "GSTIN is required";
  } else if (!gstinPattern.test(formData.medicalGstin)) {
      newErrors.gstIn = "GSTIN must be 15-character alphanumeric code.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.medicalEmail) {
        newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.medicalEmail)) {
        newErrors.email = "Email is invalid";
    }

    if (formData.medicalPassword.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.medicalPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   async function handleSubmit(e) {
    
    e.preventDefault();
    
    if (validateForm()) {
      // Submit the form data to the backend
      try{
      
        await api.post("/medicals",
          {
            name:formData.medicalName,
            gstIn:formData.medicalGstin,
            dlNo:formData.medicalDlno,
            address:formData.medicalAddress,
            region:formData.medicalRegion,
            password:formData.medicalPassword,
            email:formData.medicalEmail
          },
          
        );
        
      
      }catch(err){
        console.log(err)
        
      }
      console.log('Registration successful!', formData);
      navigate("/med-home")
    } else {
      console.log('Validation failed.');
    }
  };

  return (
    <div className="medical-registration-container">
      <form className="medical-registration-form" onSubmit={handleSubmit}>
        <h2>Medical Registration</h2>
        <div className="form-group">
          <label htmlFor="medicalName">Medical Name</label>
          <input
            type="text"
            id="medicalName"
            name="medicalName"
            value={formData.medicalName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalDlno">License Number</label>
          <input
            type="text"
            id="medicalDlno"
            name="medicalDlno"
            value={formData.medicalDlno}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>GSTIN</label>
          <input
            type="text"
            id="medicalGstin"
            name="medicalGstin"
            value={formData.medicalGstin}
            onChange={handleChange}
            required
          />
           {errors.gstIn && <span style={{color: 'red'}}>{errors.gstIn}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="medicalRegion">Region</label>
          <input
            type="text"
            id="medicalRegion"
            name="medicalRegion"
            value={formData.medicalRegion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalAddress">Address</label>
          <input
            type="text"
            id="medicalAddress"
            name="medicalAddress"
            value={formData.medicalAddress}
            onChange={handleChange}
            required
          />

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              id='medicalEmail'
              name="medicalEmail"
              value={formData.medicalEmail}
              onChange={handleChange}
              required
            />
            {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
            </div>

        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="medicalPassword"
            name="medicalPassword"
            value={formData.medicalPassword}
            onChange={handleChange}
            required
          />
          {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default MedicalRegistration;

