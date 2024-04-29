import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import AddEntityForm from './AddEntityForm';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getWatchlists'); // Use the correct endpoint from your backend
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error('Data fetched is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddEntity = () => {
        setShowAddForm(!showAddForm);
    };

    const handleUpdateProduct = product => {
        setSelectedProduct(product);
        setShowAddForm(true); // Show add form with selected product data for editing
    };
    
    const handleCompleteUpdate = async updatedProductData => {
        try {
            const updatedProduct = await axios.put(`http://localhost:3000/updateWatchlist/${selectedProduct._id}`, updatedProductData);
            setProducts(products.map(product => (product._id === updatedProduct.data._id ? updatedProduct.data : product)));
            setShowAddForm(false); // Hide form after update
            setSelectedProduct(null); // Clear selected product
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    
    const handleDeleteProduct = async productId => {
        try {
            await axios.delete(`http://localhost:3000/deleteWatchlist/${productId}`); // Use the correct endpoint from your backend
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="products-container">
            <button onClick={handleAddEntity}>Add Entity</button>
            {showAddForm && <AddEntityForm />}
            {products.map(product => (
                <div key={product._id} className="product-box">
                    <p className="product-name">{product.name}</p>
                    <p className="product-brand">Brand: {product.brand}</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-description">Description: {product.description}</p>
                    <p className="product-features">Features: {Array.isArray(product.features) ? product.features.join(', ') : ''}</p>
                    <button onClick={() => handleUpdateProduct(product)}>Update</button>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Products;
