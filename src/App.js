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




function App() {
  return (
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
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
