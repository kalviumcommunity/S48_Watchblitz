import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {

    // Function to handle logout
    const handleLogout = async () => {
        try {
            // Make a POST request to the logout endpoint
            await axios.post('http://localhost:3000/logout');
            // Call the onLogout function to update parent component state
            onLogout();
        } catch (error) {
            console.error('Logout error:', error.response.data);
        }
    };

    return (
        <header className="header">
            <div className="logo">WatchBlitz</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li> {/* Link to ProductsPage */}
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="auth">
                {!isLoggedIn && (
                    <>
                        <button className="login"><Link to="/login">Login</Link></button>
                        <button className="signup"><Link to="/signup">Sign Up</Link></button>
                    </>
                )}
                {isLoggedIn && (
                    <button className="logout" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </header>
    );
};

export default Header;
