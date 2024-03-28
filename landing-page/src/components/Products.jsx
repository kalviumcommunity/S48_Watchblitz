import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // Import your CSS file

const Products = () => {
    const [products, setProducts] = useState([]);
    
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

    return (
        <div className="products-container">
            {products.map(product => (
                <div key={product._id} className="product-box">
                    <p className="product-name">{product.name}</p>
                    <p className="product-brand">Brand: {product.brand}</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-description">Description: {product.description}</p>
                    <p className="product-features">Features: {Array.isArray(product.features) ? product.features.join(', ') : ''}</p>
                </div>
            ))}
        </div>
    );
};

export default Products;
