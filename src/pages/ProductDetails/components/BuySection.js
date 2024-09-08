import React from 'react';


const BuySection = ({ product }) => {
  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Added to cart:', product.name);
  };

  const handleBuyNow = () => {
    // Handle buy logic
    console.log('Proceeding to buy:', product.name);
  };

  return (
    <div className="buy-section">
      <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
      <button className="btn btn-success" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default BuySection;
