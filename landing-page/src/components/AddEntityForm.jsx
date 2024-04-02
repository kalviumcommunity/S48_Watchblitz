// AddEntityForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './AddEntityForm.css'; // Import the CSS file for styling

const AddEntityForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        description: '',
        features: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/addWatchlist', formData); // Use the correct endpoint from your backend
            // Optionally, you can reset the form fields or close the form
        } catch (error) {
            console.error('Error adding entity:', error);
        }
    };

    return (
        <div className="add-entity-form">
            <h2>Add Entity</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label>Brand:</label>
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="text" name="price" value={formData.price} onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label>Features:</label>
                    <input type="text" name="features" value={formData.features} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddEntityForm;


