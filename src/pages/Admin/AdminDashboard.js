import { useContext,useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from './Components/AdminContext';
import Sidebar from './Components/Sidebar';
import Products from './Components/Products'
import Medicals from './Components/Medicals'
import Orders from './Components/Orders'
import SalesAnalysis from './Components/SalesAnalysis'
import './AdminDashboard.css'
import api from '../../axiosConfig'
const AdminDashboard = () => {
  const { admin } = useContext(AdminContext);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalProducts,setTotalProducts]=useState(0);

  useEffect(()=>{
    api.get("/products").then(response=>{
      console.log(response.data.length);
      setTotalProducts(response.data.length);
    }).catch(error=>{
      console.log(error);
    })
  },[]);
  
  if (!admin) {
    return <Navigate to="/admin-login" />;  // Redirect to admin login if not authenticated
  }

  

  const handleSelect = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'products':
        return <Products/> ;
      case 'medicals':
        return <Medicals />;
      case 'orders':
        return <Orders />;
      case 'salesAnalysis':
        return <SalesAnalysis />;
      default:
        return <SalesAnalysis/> ;  // No component is selected initially
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar onSelect={handleSelect} />
      <div className={`dashboard-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <h2>Admin Overview</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </div>
          <div className="card" >
            <h3>Total Medicals</h3>
            <p>80</p>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>350</p>
          </div>
          <div className="card">
            <h3>Total Sales</h3>
            <p>₹5,00,000</p>
          </div>
        </div>

        <div className="selected-component-container">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
