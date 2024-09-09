import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartIcon.css';
import { FaShoppingCart } from 'react-icons/fa';  // Importing an icon for the cart

const CartIcon = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');  // Navigate to the Cart page
  };

  return (
    <div className="floating-cart-icon" onClick={handleCartClick}>
      <FaShoppingCart size={28} color="white" />
    </div>
  );
};

export default CartIcon;
