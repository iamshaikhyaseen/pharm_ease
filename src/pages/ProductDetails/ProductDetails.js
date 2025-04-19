import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import './ProductDetails.css'; // For custom styling
import { toast, ToastContainer } from 'react-toastify';  // For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Home/components/Footer'
import Navbar from '../Home/components/MedicalMainNav'
import CartIcon from '../Home/components/CartIcon';
import api from '../../axiosConfig'

const ProductDetails = () => {
  const {id} = useParams();
  console.log("Id: "+id);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity,setQuantity]=useState(1);
  const fetchProduct = async () => {
    try {
        const response = await api.get(`/products/${id}`);
        const productData = await response.data;
        console.log("Product data: "+response.data);
        
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
};
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to the cart`);
    addToCart(product,quantity);
    toast.success(`${product.name} added to cart!`)
  };

  const handleBuyNow = () => {
    console.log(`Proceeding to buy ${quantity} of ${product.name}`);
  };

  if (!product) return <div>Loading...</div>;


  return (
    <>
    <Navbar/>
    <div className="product-details-container">
      <ToastContainer position='bottom-right' autoClose={1500}/>
      <CartIcon/>
    <div className="product-image-section">
      <div className="image-wrapper">
        <img src={product.imageUrl} alt={product.name} className="zoomable-image" />
      </div>
    </div>
    <div className="product-info-section">
      <h1 className="product-name">{product.name}</h1>
      <p className="product-description">{product.description}</p>
      <p><strong>Contents : {product.contents.join(', ')}</strong> </p>
      
      <p><strong>HSN :</strong> {product.hsn}</p>
      <p><strong>Batch No :</strong> {product.batchNo}</p>
      <p><strong>Expiry :</strong> {product.expiry}</p>
      <p><strong>MRP :</strong> ₹{product.mrp}</p>
      <p><strong>Rate :</strong> ₹{product.rate}</p>

      {/* Quantity Selector */}
      <div className="quantity-section">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        
      </div>
    </div>
  </div>
  <Footer/>
  </>
  );
};

export default ProductDetails;
