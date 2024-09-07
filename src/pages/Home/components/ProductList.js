// src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ); 
}

export default ProductList;
