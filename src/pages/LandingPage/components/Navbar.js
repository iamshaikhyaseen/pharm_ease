import React from 'react'
import logo from '../../../assets/LogoTest5.png'
import './Navbar.css'
import {Link,useNavigate} from 'react-router-dom'

export default function () {
  const navigate=useNavigate();

  const handleMedicalLogin=()=>{
    navigate('/medical-login')
  }
 return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">

        <div className="container-fluid">
          
          <Link className="navbar-brand" to="/"><img src={logo} alt="logo" /></Link>
          
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <div className="d-flex">

              <button className="btn btn-outline-success me-2" onClick={handleMedicalLogin} >Medical Login</button>
             
            </div>
          

          </div>

        </div>

      </nav>
    </>
  )
}
