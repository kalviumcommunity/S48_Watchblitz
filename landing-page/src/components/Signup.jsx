import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Reusing Login.css for Signup styling

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/addUser', formData); // Adjust URL based on your backend server URL
            console.log('Signup successful:', response.data);
            // Clear form fields after successful signup
            setFormData({
                name: '',
                email: '',
                username: '',
                password: ''
            });
        } catch (error) {
            console.error('Signup error:', error.response.data);
        }
    };

    return (
        <div className="hero">
            <div className="login-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};



export default Signup;
