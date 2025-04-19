import './App.css';

import Login from './pages/LoginPage/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicalRegisterPage from './pages/RegistrationPage/RegistrationPage';
import Home from './pages/Home/Home';
import { AdminProvider } from './pages/Admin/Components/AdminContext';
import AdminLogin from './pages/Admin/Components/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Cart from './pages/Cart/Cart';
import { CartProvider } from './pages/Cart/CartContext';
import { MedicalProvider } from './pages/LoginPage/components/MedicalContext';
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile/Profile';
import { ContactUs } from './pages/ContactUs/ContactUs';
import { AboutUs } from './pages/AboutUs/AboutUs';


function App() {
  return (
    <AdminProvider>
    <MedicalProvider>
    <CartProvider>
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={< LandingPage/>} />
          <Route path="/medical-login" element={<Login />} />
          <Route path='/medical-register' element={<MedicalRegisterPage/>}/>
          <Route path='/med-home' element={<Home/>}/>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path="/:id" element={<ProductDetails />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/med-home/orders" element={<Orders />} />
          <Route path="/med-home/profile" element={<Profile />} />
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
    </MedicalProvider>
    </AdminProvider>
  );
}

export default App;
