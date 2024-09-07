import './App.css';

import Login from './pages/LoginPage/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicalRegisterPage from './pages/RegistrationPage/RegistrationPage';
import Home from './pages/Home/Home';
import AdminHome from './pages/Admin/AdminHome';




function App() {
  return (
    <>
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={< LandingPage/>} />
          <Route path="/medical-login" element={<Login />} />
          <Route path='/medical-register' element={<MedicalRegisterPage/>}/>
          <Route path='/med-home' element={<Home/>}/>
          <Route path='/admin' element={<AdminHome/>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
