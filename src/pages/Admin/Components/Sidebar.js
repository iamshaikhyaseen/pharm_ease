import React,{useState,useContext} from 'react';
import './Sidebar.css';  // Custom styles for the sidebar
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navigate=useNavigate();
  const handleLogout=()=>{
    setAdmin(null);

  }
  const confirmLogOut = (id) => {
      confirmAlert({
        title: 'Confirm to Logout',
        message: 'Are you sure you want to LogOut?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => handleLogout()
          },
          {
            label: 'No',
            onClick: () => toast.info('Logout operation cancelled.')
          }
        ]
      });
    };

  const { setAdmin } = useContext(AdminContext);

  return (
    <>
    <ToastContainer position="bottom-right" autoClose={3000} />
    <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
            
      </div>
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Admin Dashboard</h3>
      </div>
      <ul className="sidebar-list">
        <li>
          <Link onClick={() => onSelect('products')}>Manage Products</Link>
        </li>
        <li>
          <Link onClick={() => onSelect('medicals')}>Manage Medicals</Link>
        </li>
        <li>
          <Link onClick={() => onSelect('salesAnalysis')}>Sales Analysis</Link>
        </li>
        <li>
        <Link onClick={confirmLogOut}>Logout</Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
