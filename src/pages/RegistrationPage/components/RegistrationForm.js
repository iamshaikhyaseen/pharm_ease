import React, { useEffect, useState } from 'react'
import api from '../../../axiosConfig'
import { useNavigate } from 'react-router-dom';

export default function MedicalRegister() {
  const [medicalName,setName]=useState("");
  const [medicalGstIn,setGstIn]=useState("");
  const [medicalDlNo,setDlNo]=useState("");
  const [medicalAddress,setAddress]=useState("");
  const [medicals,setMedicals]=useState("");
  const [medicalRegion,setRegion]=useState("");

  const navigate=useNavigate();

 
  async function save(event){
    event.preventDefault()
    try{
      
        
      
      await api.post("/medicals",
        {
          name:medicalName,
          gstIn:medicalGstIn,
          dlNo:medicalDlNo,
          address:medicalAddress,
          region:medicalRegion
        },
        navigate('/med-home')
      );
      setName("");
      setDlNo("");
      setGstIn("");
      setAddress("");
      setRegion("");
    
    }catch(err){
      console.log(err)
      
    }
  }

  const getMedicals=async ()=>{
    try{
      const response=api.get("/medicals");
      console.log((await response).data);
      setMedicals((await response).data);

    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getMedicals();
  },[]);

 return (
    <>
        <section className="vh-100">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">

        <div className="px-5 ms-xl-4">
            
          <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{color: "#709085"}}/> 
          <span className="h1 fw-bold mb-0">PharmEase</span>
        </div>

        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form style={{width:"23rem"}} id='licenseForm'>

            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Log in as Medical</h3>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text" required id="medicalName" className="form-control form-control-lg" value={medicalName} 
              onChange={(event)=>{
                setName(event.target.value)
              }} />
              <label className="form-label" htmlFor="medicalName">Medical Name</label>
            </div>
    
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text" required id="medicalGstIn" className="form-control form-control-lg" value={medicalGstIn} 
              onChange={(event)=>{
                setGstIn(event.target.value)
              }} />
              <label className="form-label" htmlFor="medicalGstIn">GST IN</label>
            </div> 

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text"  required id="medicalDlNo" className="form-control form-control-lg" value={medicalDlNo} 
              onChange={(event)=>{
                setDlNo(event.target.value)
              }} />
              
               
              <label className="form-label" htmlFor="medicalDlNo">Drug License No</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type='text' required id="medicalAddress" className="form-control form-control-lg" value={medicalAddress} 
              onChange={(event)=>{
                setAddress(event.target.value)
              }} />
              <label className="form-label" htmlFor="medicalAddress">Address</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type='text' required id="medicalRegion" className="form-control form-control-lg" value={medicalRegion} 
              onChange={(event)=>{
                setRegion(event.target.value)
              }} />
              <label className="form-label" htmlFor="medicalRegion">Region(City)</label>
            </div>

            <div className="pt-1 mb-4">
              <button data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-lg btn-block"  id='submitBtn' type="button" onClick={save}>Register</button>
            </div>


          </form>

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
          alt="" className="w-100 vh-100" style={{objectFit:"cover",objectPosition:"left"}}/>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
