import React, { useState } from 'react';
import './ProductImageZoom.css'; 

const ProductImageZoom = ({ image }) => {
  const [zoom, setZoom] = useState(false);

  const handleMouseOver = () => setZoom(true);
  const handleMouseOut = () => setZoom(false);

  return (
    <div className="image-container">
      <img
        src={image}
        alt="Product"
        className={zoom ? 'zoomed' : ''}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
};

export default ProductImageZoom;
