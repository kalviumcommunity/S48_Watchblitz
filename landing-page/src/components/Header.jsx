// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">WatchBlitz</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="auth">
                <button className="login"><Link to="/login">Login</Link></button> {/* Link to the login page */}
                <button className="signup"><Link to="/signup">Sign Up</Link></button> {/* Link to the signup page */}
            </div>
        </header>
    );
};

export default Header;

