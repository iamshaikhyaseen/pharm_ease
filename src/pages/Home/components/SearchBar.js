// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-secondary" type="button" onClick={handleSearch} style={{backgroundColor:"#f8b525"}}>Search</button>
    </div>
  );
}

export default SearchBar;
