// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            console.log('Login successful:', response.data);
            // Set cookie
            document.cookie = `username=${formData.username}`;
            document.cookie = `accesstoken=${response.data.token}`;

            setSuccessMessage('Login successful');
            setErrorMessage('');
            // Call onLogin function to update parent component state
            onLogin();
            // Redirect to another page or perform additional actions after successful login
        } catch (error) {
            console.error('Login error:', error.response.data);
            setErrorMessage('Invalid username or password');
            setSuccessMessage('');
        }
    };

    const handleLogout = async () => {
        try {
            // Send a request to the server to logout
            await axios.post('http://localhost:3000/logout');
            // Clear the username cookie locally
            // Call onLogout function to update parent component state
            onLogout();
            // Reset form data and messages
            setFormData({ username: '', password: '' });
            setErrorMessage('');
            setSuccessMessage('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
            setErrorMessage('Error logging out');
            setSuccessMessage('');
        }
    };
    
    
    return (
        <div className="hero">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
};

export default Login;