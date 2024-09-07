import React,{useState} from 'react'
import api from '../../axiosConfig'
export default function AdminHome() {
    async function handleSubmit() {
        try {
            await api.post("/products",{
                name:"RetrafloxOz",
                hsn:30042034,
                batchNo:"WT2563E",
                pack:"10x10",
                expiry:"25-08-2025",
                mrp:120,
                rate:96,
                type:"Tablets",
                contents:["Ofloxacin 200mg","Ornidazole 500mg"]
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
