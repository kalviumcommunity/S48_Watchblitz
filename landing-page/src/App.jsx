// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import AddEntityPage from './components/AddEntityPage';
import ProductsPage from './components/Products';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

    // Function to handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Function to handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div>
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/add-entity" element={isLoggedIn ? <AddEntityPage /> : <Navigate to="/login" />} />
                    <Route path="/products" element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};



export default App;
