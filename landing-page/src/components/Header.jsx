// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
                <button className="login"><Link to="/login">Login</Link></button>
                <button className="signup"><Link to="/signup">Sign Up</Link></button>
            </div>
        </header>
    );
};

export default Header;
