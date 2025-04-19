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
  const [totalMedicals,setTotalMedicals]=useState(0);
  const [totalOrders,setTotalOrders]=useState(0);
  const [totalSales,setTotalSales]=useState(0);

  useEffect(()=>{
    api.get("/products").then(response=>{
      console.log(response.data.length);
      setTotalProducts(response.data.length);
    }).catch(error=>{
      console.log(error);
    })
  },[]);
  useEffect(()=>{
    api.get("/medicals").then(response=>{
      console.log(response.data.length);
      setTotalMedicals(response.data.length);
    }).catch(error=>{
      console.log(error);
    })
  },[]);
  useEffect(()=>{
    api.get("/bills").then(response=>{
      console.log(response.data.length);
      setTotalOrders(response.data.length);
    }).catch(error=>{
      console.log(error);
    })
  },[]);

  useEffect(()=>{
      fetchTotalSales();
    })

    const handleSalesClick=()=>{ 
        fetchTotalSales();
    }

    const handleOrderClick=()=>{
      api.get("/bills").then(response=>{
        console.log(response.data.length);
        setTotalOrders(response.data.length);
      }).catch(error=>{
        console.log(error);
      })
    }

    const handleMedicalClick=()=>{
      api.get("/medicals").then(response=>{
        console.log(response.data.length);
        setTotalMedicals(response.data.length);
      }).catch(error=>{
        console.log(error);
      })
    }

    const handleProductClick=()=>{
      api.get("/products").then(response=>{
        console.log(response.data.length);
        setTotalProducts(response.data.length);
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const fetchTotalSales=async()=>{
      try{
        const response= await api.get('/sales/totalSales');
        setTotalSales(response.data);
      }
      catch(err){
        console.log("Error in totalSales: ",err);
      }
    }

  
  if (!admin) {
    return <Navigate to="/" />;  // Redirect to admin login if not authenticated
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
          <div className="card" onClick={handleProductClick}>
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </div>
          <div className="card" onClick={handleMedicalClick}>
            <h3>Total Medicals</h3>
            <p>{totalMedicals}</p>
          </div>
          <div className="card" onClick={handleOrderClick}>
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
          <div className="card" onClick={handleSalesClick}>
            <h3>Total Sales</h3>
            <p>{totalSales}</p>
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
