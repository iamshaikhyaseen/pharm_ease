import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';
import { FaShoppingCart } from 'react-icons/fa';
import Navbar from '../Home/components/MedicalMainNav'
import Footer from '../Home/components/Footer'
import * as ProductImages from '../../assets/Products/productImgs'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems,updateQuantity, calculateTotal } = useContext(CartContext);
  const navigate=useNavigate();
  const handleOrderNow = () => {
    // Handle order logic here
    console.log('Order placed:', cartItems);
  };
  
  const handleQuantityChange = (product, quantity) => {
    if (quantity >= 1) {
      updateQuantity(product, quantity);
    }
  };

  const handleProductClick = (e, product) => {
    e.stopPropagation();  // Prevent any event bubbling
    navigate(`/${product.name}`);  // Navigate to the ProductDetails page
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();  // Prevent click propagation for quantity controls
  };
  

  if (cartItems.length === 0) {
    return <>
    <Navbar/>
    <div className="cart-container1">
      <div>
      <FaShoppingCart size={28} color="white" />
      Your Cart is Empty
      </div>
      </div>
      <Footer/>
      </>
  }
  

  return (
    <>
    <Navbar/>

    <div className="cart-container">
      <div className="cartLogo">
    <FaShoppingCart size={28} color="white" />
      <h1>Your Cart</h1>
      </div>
      <div className="cart-items">

        {cartItems.map((item) => (

          <div className="cart-item" key={item.name} onClick={(e)=>handleProductClick(e,item)}>

            <img src={ProductImages[item.name]} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">

              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <div className="cart-item-actions">

                <div className="quantity-control" onClick={handleStopPropagation}>

                  <button onClick={(e) =>{handleStopPropagation(e); handleQuantityChange(item, item.quantity - 1)}}>-</button>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) =>{handleStopPropagation(e); handleQuantityChange(item, Number(e.target.value))}} 
                    min="1"
                  />

                  <button onClick={(e) =>{handleStopPropagation(e); handleQuantityChange(item, item.quantity + 1)}}>+</button>

                </div>

                <p className="cart-item-price">Price: ₹{item.rate * item.quantity}</p>

              </div>

            </div>

          </div>

        ))}

      </div>
      <div className="cart-total">
        <h3>Total: ₹{calculateTotal()}</h3>
      </div>
      <button className="btn-order-now" onClick={handleOrderNow}>Order Now</button>
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
