// src/components/SortOptions.js
import React from 'react';
const SortOptions = ({ onSort }) => {
  return (
    
    <div className="d-flex justify-content-end mb-3">
      <select className="form-select" onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
    
  );
}

export default SortOptions;
