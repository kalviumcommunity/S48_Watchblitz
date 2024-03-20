import React from 'react';
import './Header.css'; // Import Header.css file

const Header = () => {
    return (
        <header className="header">
            <div className="logo">WatchBlitz</div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="auth">
                <button className="login">Login</button>
                <button className="signup">Sign Up</button>
            </div>
        </header>
    );
};

export default Header;
