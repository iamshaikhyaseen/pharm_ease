import React, { createContext, useState } from 'react';

// Create a Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };
  const updateQuantity = (product, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === product._id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item._id !== product._id)
    );
  };

  const clearCart = () => {
    setCartItems([]);  // This clears all items from the cart
  };

  // Calculate total price of the cart
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.rate * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart,updateQuantity, calculateTotal, removeFromCart,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
