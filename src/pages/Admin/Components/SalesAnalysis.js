import React, { useEffect, useState } from 'react';
import api from '../../../axiosConfig';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './SalesAnalysis.css'
import { color } from 'framer-motion';

const SalesAnalysis = () => {
  const [salesData,setSalesData]=useState([]);
  
  useEffect(()=>{
    fetchSalesData();
  },[])

  
  const fetchSalesData = async () => {
    try {
      const response = await api.get('/sales'); // Adjust API endpoint if needed
      const rawData = response.data;

      // Transform backend data to fit Recharts format
      const formattedData = rawData.reduce((acc, sale) => {
        const month = new Date(sale.date).toLocaleString('default', { month: 'short' }); // Get month abbreviation
        const existingMonth = acc.find(item => item.name === month);

        if (existingMonth) {
          existingMonth.sales += sale.totalAmount;
        } else {
          acc.push({ name: month, sales: sale.totalAmount });
        }
        return acc;
      }, []);

      setSalesData(formattedData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  return (
    <div className='sal' onClick={fetchSalesData}>
      <h2 >Sales Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={salesData}>
          <Line type="monotone" dataKey="sales" stroke="#1abc9c" strokeWidth={2} />
          <CartesianGrid stroke='white' />
          <XAxis dataKey="name" stroke='white' />
          <YAxis stroke='white'/>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalysis;
    