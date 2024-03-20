// Signup.js

import React from 'react';
import './Login.css'; // Reusing Login.css for Signup styling

const Signup = () => {
    return (
        <div className="hero">
            <div className="login-container">
                <h2>Sign Up</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
    
};

export default Signup;
