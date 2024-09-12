import React,{useState} from 'react'
import api from '../../axiosConfig'
export default function AdminHome() {
    async function handleSubmit() {
        try {
            await api.post("/products",{
                name:"SonaflamTP4",
                hsn:30042090,
                batchNo:"WD269A",
                pack:"10x10",
                expiry:"01-05-2025",
                mrp:120,
                rate:96,
                type:"Tablets ",
                contents:["Montelukast 400mg","Levocitrezene  7mg"]
            });
            
        } catch (err) {
            console.log(err);
                }
    }
  return (
        <>
            <button onClick={handleSubmit}>Submit</button>
        </>
  )
}
