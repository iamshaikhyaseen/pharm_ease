import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageZoom from './components/ProductImageZoom';
import BuySection from './components/BuySection';
import ProductInfo from './components/ProductInfo';
import './ProductDetails.css'; // For custom styling

import api from '../../axiosConfig'
import * as ProductImages from '../../assets/Products/productImgs'

const ProductDetails = () => {
  const { name } = useParams();
  console.log(name);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details based on the product ID
    // Assuming you have an API to fetch product details
    // Replace this with actual API call
    const fetchProduct = async () => {
        try {
            // Make sure you're passing only the ID in the URL
            const response = await fetch(`http://localhost:8080/api/products/${name}`);
            const productData = await response.json();
            setProduct(productData);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
    };
    
    fetchProduct();
  }, [name]);

  if (!product) return <div>Loading...</div>;
  const productImage=ProductImages[product.name]

  return (
    <div className="product-details">
      <div className="product-main">
        <ProductImageZoom image={productImage} />
        <ProductInfo product={product} />
      </div>
      <BuySection product={product} />
    </div>
  );
};

export default ProductDetails;
