import React, { useState, useEffect } from 'react';
import Navbar from './components/MedicalMainNav';
import Carousel from './components/Carousel';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/categoryFilter';
import SortOptions from './components/SortOptions';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

// CSS
import './Home.css';
// API
import api from '../../axiosConfig';
//Images



const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    api.get('/products') // Replace with your API endpoint
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = (query) => {
    setFilteredProducts(products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())));
  };

  const handleCategorySelect = (category) => {
    setFilteredProducts(products.filter(p => p.type === category));
  };

  const handleSort = (sortOption) => {
    let sortedProducts;
    switch (sortOption) {
      case 'price-asc':
        sortedProducts = [...filteredProducts].sort((a, b) => a.mrp - b.mrp);
        break;
      case 'price-desc':
        sortedProducts = [...filteredProducts].sort((a, b) => b.mrp - a.mrp);
        break;
      case 'name-asc':
        sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedProducts = filteredProducts;
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <SearchBar onSearch={handleSearch} />
        <Carousel />
        <CategoryFilter categories={['Capsules', 'Tablets', 'Syrups']} onSelectCategory={handleCategorySelect} />
        <SortOptions onSort={handleSort} />
        <ProductList products={filteredProducts} />
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
