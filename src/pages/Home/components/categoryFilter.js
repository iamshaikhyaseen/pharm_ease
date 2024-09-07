// src/components/CategoryFilter.js
import React from 'react';
import './categoryFilter.css'
const CategoryFilter = ({ categories, onSelectCategory }) => {
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
    </div>
    </div>
  );
}

export default CategoryFilter;
