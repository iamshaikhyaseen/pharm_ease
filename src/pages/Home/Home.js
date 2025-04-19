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
import CartIcon from './components/CartIcon';
//Images



const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    
    api.get('/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log(response.data);
        
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

  const handleClearFilter = () => {
    setFilteredProducts(products); // Show all products
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
      <div className="container">
        <CartIcon/>
        <SearchBar onSearch={handleSearch} />
        <Carousel />
        <CategoryFilter categories={['Capsules', 'Tablets', 'Syrups']} onSelectCategory={handleCategorySelect} onClearFilter={handleClearFilter} />
        <SortOptions onSort={handleSort} />
        <ProductList products={filteredProducts} />
        
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
