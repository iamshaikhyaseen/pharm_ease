import React, { useContext, useEffect, useState } from 'react';
import api from '../../axiosConfig';
import './Orders.css';
import { MedicalContext } from '../LoginPage/components/MedicalContext';
import MedicalNavbar from '../Home/components/MedicalMainNav'
const Orders = () => {
  const {medicalData}=useContext(MedicalContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/bills'); // Fetch all bills (replace with the appropriate API call)
        const filteredOrders = response.data.filter(order => order.medicalId === medicalData._id); // Filter bills by the logged-in medical name
        setOrders(filteredOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (<>
  <MedicalNavbar/>
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Bill No</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Products</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.date}</td>
                  <td>{order.dueDate}</td>
                  <td>
                    <ul>
                      {order.products.map(product => (
                        <li key={product.name}>
                          {product.name} - {product.quantity} units &nbsp;&nbsp; ₹{product.totalPrice}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.grandTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </>
  );
};

export default Orders;
