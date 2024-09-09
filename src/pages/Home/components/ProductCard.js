// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css'
import * as productImages from '../../../assets/Products/productImgs';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const productImage=productImages[product.name]

  const navigate = useNavigate();
  const handleClick = () => {
    console.log(product.name)
    navigate(`/${product.name}`);
  };

  return (
    <div className="card" style={{ width: '18rem' }} onClick={handleClick}>   
      <div className="cardImg">
      <img src={productImage} className="card-img-top" alt={product.name} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.contents[0]+"+"+product.contents[1]}</p>
        <p className="card-text">Rs.{product.mrp}</p> 
        <button className="btn btn-primary">Order Now</button>
        
      </div>
    </div>
  );
}                                                                                                                                               

export default ProductCard;
