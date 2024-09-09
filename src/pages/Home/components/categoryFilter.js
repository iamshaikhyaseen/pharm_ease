// src/components/CategoryFilter.js
import React from 'react';
import './categoryFilter.css'
const CategoryFilter = ({ categories, onSelectCategory, onClearFilter }) => {
  return (
    <div className="containerCategory">
    <div className="btn-group" role="group" aria-label="Basic example">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
        
      ))}
      <button
          type="button"
          className="btn btn-outline-danger"
          onClick={onClearFilter}
        >
          Clear
        </button>
    </div>
    </div>
  );
}

export default CategoryFilter;
