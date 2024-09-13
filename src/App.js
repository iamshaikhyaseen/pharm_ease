import './App.css';

import Login from './pages/LoginPage/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicalRegisterPage from './pages/RegistrationPage/RegistrationPage';
import Home from './pages/Home/Home';
import AdminHome from './pages/Admin/AdminHome';
import Cart from './pages/Cart/Cart';
import { CartProvider } from './pages/Cart/CartContext';
import { MedicalProvider } from './pages/LoginPage/components/MedicalContext';
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile/Profile';


function App() {
  return (
    <MedicalProvider>
    <CartProvider>
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={< LandingPage/>} />
          <Route path="/medical-login" element={<Login />} />
          <Route path='/medical-register' element={<MedicalRegisterPage/>}/>
          <Route path='/med-home' element={<Home/>}/>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path="/:name" element={<ProductDetails />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/med-home/orders" element={<Orders />} />
          <Route path="/med-home/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
    </MedicalProvider>
  );
}

export default App;
