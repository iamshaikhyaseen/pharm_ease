import React, { useContext, useEffect, useState } from 'react';
import api from '../../axiosConfig';
import './Profile.css';
import Footer from '../Home/components/Footer'
import Navbar from '../Home/components/MedicalMainNav'
import { toast, ToastContainer } from 'react-toastify';  // For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';  // For confirmation dialog
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MedicalContext } from '../LoginPage/components/MedicalContext';
const Profile = () => {
  const {medicalData}=useContext(MedicalContext);
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    region: '',
    gstIn: '',
    dlNo: '',
    email: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const response = await api.get(`/medicals/${medicalData._id}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const validateFields = () => {
    let valid = true;
    let newErrors = {};

    // Validate GSTIN (assuming a valid GSTIN is 15 characters long)
    if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(profileData.gstIn)) {
      newErrors.gstIn = 'Invalid GSTIN format';
      valid = false;
    }

    // Validate Drug License Number (example validation)
    

    if(!profileData.name.trim()){
        newErrors.name='Medical Name cannot be Empty'
        valid=false;
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Validate Password (if password is being updated)
    if (profileData.password && profileData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSave = async () => {
    const updateData= { ...profileData };
    if (!validateFields()) {
      return;
    }
    if (!profileData.password) {
        delete updateData.password;  // Don't send the password if it's empty
      }

    try {
      await api.put(`/medicals/${profileData._id}`, profileData);
      setSuccessMessage('Profile updated successfully!');
      toast.success("Profile Updated Successfully")
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      toast.error("Profile Update failed!");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
 
  return (
    <>
    <Navbar/>
    <div className="profile-container">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h2>Your Profile</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="profile-info">
        <label htmlFor="name">Medical Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={profileData.name}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          value={profileData.address}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label htmlFor="region">Region</label>
        <input
          type="text"
          id="region"
          name="region"
          required
          value={profileData.region}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label htmlFor="gstin">GSTIN</label>
        <input
          type="text"
          id="gstIn"
          name="gstIn"
          required
          value={profileData.gstIn}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        {errors.gstIn && <p className="error-message">{errors.gstIn}</p>}

        <label htmlFor="dlno">Drug License No.</label>
        <input
          type="text"
          id="dlNo"
          name="dlNo"
          required
          value={profileData.dlNo}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={profileData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={profileData.password}
          onChange={handleInputChange}
          disabled={!isEditing}
          placeholder="Change Password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <div className="profile-buttons">
          {isEditing ? (
            <>
              <button className="btn-save" onClick={handleSave}>Save</button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
