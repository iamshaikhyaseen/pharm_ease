import React, { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const medicalNameData = localStorage.getItem('medicalName'); // Retrieve medical name from local storage
        const response = await api.get('/bills'); // Fetch all bills (replace with the appropriate API call)
        const filteredOrders = response.data.filter(order => order.medicalName === medicalNameData); // Filter bills by the logged-in medical name
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

  return (
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
                          {product.name} - {product.quantity} units
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
  );
};

export default Orders;
