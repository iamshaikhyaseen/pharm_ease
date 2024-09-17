// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css'
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
 

  const navigate = useNavigate();
  const handleClick = () => {
    console.log(product.name)
    navigate(`/${product._id}`);
  };

  return (
    <div className="card" onClick={handleClick}>   
      <div className="cardImg">
      <img src={product.imageUrl} className="card-img-top" alt={product.name} />
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
