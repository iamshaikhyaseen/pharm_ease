import React,{useState} from 'react';
import './Sidebar.css';  // Custom styles for the sidebar
import { Link } from 'react-router-dom';
const Sidebar = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
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
          <Link onClick={() => onSelect('orders')}>Manage Orders</Link>
        </li>
        <li>
          <Link onClick={() => onSelect('salesAnalysis')}>Sales Analysis</Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
