// src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'

const ProductList = ({ products }) => {
  return (
    <div className="product-list-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ); 
}
 
export default ProductList;
