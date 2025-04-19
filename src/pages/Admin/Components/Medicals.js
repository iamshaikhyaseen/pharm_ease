import React, { useState, useEffect } from 'react';
import api from '../../../axiosConfig';  // API for backend
import './Medicals.css';  // Styling
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css';

const Medicals = () => {
  const [medicals, setMedicals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dlNo: '',
    gstin: '',
    region: '',
    password: '',
    address: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingMedicalId, setEditingMedicalId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('region');
  const [isEditingPassword,setIsEditingPassword]=useState(false);

  useEffect(() => {
    fetchMedicals();
  }, []);

  const fetchMedicals = async () => {
    try {
      const response = await api.get('/medicals');
      setMedicals(response.data);
    } catch (error) {
      console.error('Error fetching medicals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Medical Name is required.';
    }

    const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
    if (!formData.gstin) {
      newErrors.gstin = 'GSTIN is required';
    } else if (!gstinPattern.test(formData.gstin)) {
      newErrors.gstin = 'GSTIN must be a 15-character alphanumeric code.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if ((!isEditing || isEditingPassword) && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address Name is required.';
    }

    if (!formData.region.trim()) {
      newErrors.region = 'Region Name is required.';
    }

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("Form submitted");
    if (!validateForm()) return;
    const payload={...formData};
    if (!isEditingPassword && isEditing){
      delete payload.password;
    };
    console.log("payload: "+payload);
    

    try {
      if (isEditing) {
        const response=await api.put(`/medicals/${editingMedicalId}`, payload);
        console.log("Update response:", response.data); 
        fetchMedicals();
        toast.success('Medical updated successfully!');
      } else {
        const response=await api.post('/medicals', payload);
        console.log("Add response:", response.data);
        toast.success('Medical added successfully!');
      }   
     handleCancelEdit();
    } catch (error) {
      console.error('Error adding/updating medical:', error);
      if (error.response && error.response.status === 409) {
        toast.error('Email, GSTIN, or DLNo already exists.');
      } else {
        toast.error('Failed to save medical.');
      }
    }
  };

  const handleEdit = (medical) => {
    setFormData({
      name: medical.name,
      dlNo: medical.dlNo,
      gstin: medical.gstin,
      region: medical.region,
      address: medical.address,
      email: medical.email,
      password: '',
    });
    setEditingMedicalId(medical._id);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditingPassword(false);
    setIsEditing(false); // Reset the password change state
    setEditingMedicalId(null); // Exit the editing mode
    setFormData({ // Reset form data
      name: '',
      dlNo: '',
      gstin: '',
      email: '',
      address:'',
      region:'',
      password: ''
    });
    setErrors({});  // Clear errors
  };

  const confirmDeleteMedical = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this Medical?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id)
        },
        {
          label: 'No',
          onClick: () => toast.info('Delete operation cancelled.')
        }
      ]
    });
  };

  const handleDelete = async (id) => {
      try {
        await api.delete(`/medicals/${id}`);
        toast.success('Medical deleted successfully!');
        fetchMedicals();
      } catch (error) {
        console.error('Error deleting medical:', error);
        toast.error('Failed to delete medical.');
      }
    
  };

  const filteredMedicals = medicals.filter(medical =>
    medical.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medical.dlNo.includes(searchQuery) ||
    medical.gstin.includes(searchQuery) ||
    medical.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMedicals = filteredMedicals.sort((a, b) => {
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  });

  return (
    <div className="medicals-container">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h2>Manage Medicals</h2>
      <input
        type="text"
        placeholder="Search by Name, DLNo, GSTIN or Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      

      <table>
        <thead>
          <tr>
            <th onClick={() => setSortField('name')}>Name</th>
            <th onClick={() => setSortField('dlNo')}>DLNo</th>
            <th onClick={() => setSortField('gstin')}>GSTIN</th>
            <th onClick={() => setSortField('region')}>Region</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedMedicals.map((medical) => (
            <tr key={medical._id}>
              <td>{medical.name}</td>
              <td>{medical.dlNo}</td>
              <td>{medical.gstin}</td>
              <td>{medical.region}</td>
              <td>{medical.email}</td>
              <td>
                {/* <button onClick={() => handleEdit(medical)}>Edit</button> */}
                <button onClick={() => confirmDeleteMedical(medical._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicals;
