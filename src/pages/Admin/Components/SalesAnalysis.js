import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './SalesAnalysis.css'
const data = [
  { name: 'Jan', sales: 250 },
  { name: 'Feb', sales: 1500 },
  { name: 'Mar', sales: 1700 },
  { name: 'Apr', sales: 2000 },
  { name: 'May', sales: 2200 },
  { name: 'June', sales: 1800 },
  { name: 'July', sales: 1600 },
  { name: 'Aug', sales: 1900 },
  { name: 'Sep', sales: 2000 },
  { name: 'Oct', sales: 2100 },
  { name: 'Nov', sales: 2200 },
  { name: 'Dec', sales: 2100 },
  // Add more monthly data...
];

const SalesAnalysis = () => {
  return (
    <div>
      <h2>Sales Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="sales" stroke="#1abc9c" strokeWidth={2} />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalysis;
    