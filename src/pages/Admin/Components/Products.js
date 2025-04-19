import React, { useState, useEffect } from 'react';
import api from '../../../axiosConfig';
import axios from 'axios';
import './Products.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css';
 
const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    contents:[],
    hsn:'',
    batchNo:'',
    pack:'',
    expiry:'',
    mrp:0,
    rate:0,
    type:'',
    description: '',
    stock: 0,
    imageUrl: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const[image,setImage]=useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle input changes for product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleContentsChange = (e) => {
    const value = e.target.value;
    setNewProduct({ ...newProduct, contents: value.split(',') });  // Split by comma and convert to array
  };
  


  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store selected file
    setImagePreview(file);
  };

   const resetForm = () => {
    setNewProduct({
      name: '',
      contents: [],
      hsn: '',
      batchNo: '',
      pack: '',
      expiry: '',
      mrp: 0,
      rate: 0,
      type: '',
      description: '',
      stock: 0,
      imageUrl: ''
    });
    setImage(null);
    setImagePreview(null);
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'cfexqd6u');  // Cloudinary preset

    setLoading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/deeuhdusi/image/upload`,
        formData
      );
      setLoading(false);
      return res.data.secure_url;  // Cloudinary secure URL
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      setLoading(false);
      return null;
    }
  };

  // Add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) {
      alert('Image upload failed!');
      return;
    }

    const productData = { ...newProduct, imageUrl };
    console.log("Product data for adding: "+productData);

    try {
      const response = await api.post('/products', productData);  // Send product data to backend
      console.log("Product created:", response.data);
      fetchProducts();  // Refresh product list
      resetForm();
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    }
  };

  const confirmDeleteProduct = (productId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteProduct(productId)
        },
        {
          label: 'No',
          onClick: () => toast.info('Delete operation cancelled.')
        }
      ]
    });
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      fetchProducts();  // Refresh product list
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
  };

  // Prepare a product for editing
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      contents:product.contents,
      hsn:product.hsn,
      batchNo:product.batchNo,
      pack:product.pack,
      expiry:product.expiry,
      mrp:product.mrp,
      rate:product.rate,
      type:product.type,
      description:product.description,
      stock:product.stock,
      imageUrl:product.imageUrl
    });
    setImagePreview(product.imageUrl);  
  };

  // Update an existing product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    let imageUrl=newProduct.imageUrl;

    if (image) {
      imageUrl = await uploadImageToCloudinary();  // If a new image is uploaded
      if (!imageUrl) {
        alert('Image upload failed!');
        return;
      }
    }

    const productData = { ...newProduct, imageUrl };
    console.log("Product data for updating: "+productData);

    try {
      await api.put(`/products/${editingProduct._id}`, productData);
      fetchProducts();  // Refresh product list
      setEditingProduct(null);
      resetForm();
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  return (
    <div className="products-container">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h2>Manage Products</h2>

      {/* Add/Edit Product Form */}
      <div className="product-form">
        <h3>{editingProduct ? 'Update Product' : 'Add New Product'}</h3>
        <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contents</label>
            <input
              type="text"
              name="contents"
              value={newProduct.contents}
              onChange={handleContentsChange}
              required
            />
          </div>
          <div className="form-group">
            <label>HSN</label>
            <input
              type="text"
              name="hsn"
              value={newProduct.hsn}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Batch No</label>
            <input
              type="text"
              name="batchNo"
              value={newProduct.batchNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pack</label>
            <input
              type="text"
              name="pack"
              value={newProduct.pack}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Expiry</label>
            <input
              type="date"
              name="expiry"
              value={newProduct.expiry}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mrp</label>
            <input
              type="number"
              name="mrp"
              value={newProduct.mrp}
              onChange={handleInputChange}
              required
            />
            
          </div>
          <div className="form-group">
            <label>Rate</label>
            <input
              type="number"
              name="rate"
              value={newProduct.rate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            
            <select name="type" value={newProduct.type} onChange={handleInputChange} required>
            <option value="Capsules">Capsules</option>
            <option value="Tablets">Tablets</option>
            <option value="Syrups">Syrups</option>
            <option value="Injections">Injections</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" name="image" onChange={handleImageChange} />
            
          </div>
          
          <button type="submit" className="btn-submit">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h3>Product List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contents</th>
              <th>HSN</th>
              <th>Batch</th>
              <th>Pack</th>
              <th>Expiry</th>
              <th>Mrp</th>
              <th>Rate</th>
              <th>Type</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.contents.join(', ')}</td>
                <td>{product.hsn}</td>
                <td>{product.batchNo}</td>
                <td>{product.pack}</td>
                <td>{product.expiry}</td>
                <td>₹{product.mrp}</td>
                <td>₹{product.rate}</td>
                <td>{product.type}</td>
                <td>{product.stock}</td>
                <td>
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                </td>
                <td>
                  <button onClick={() => handleEditProduct(product)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => confirmDeleteProduct(product._id)} className="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
