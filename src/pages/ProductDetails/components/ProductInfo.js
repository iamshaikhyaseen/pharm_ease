import React from 'react';


const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Type:</strong> {product.type}</p>
      <p><strong>MRP:</strong> ₹{product.mrp}</p>
    </div>
  );
};

export default ProductInfo;
