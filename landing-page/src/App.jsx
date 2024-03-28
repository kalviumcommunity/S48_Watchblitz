// App.jsx
import React from 'react';
import Header from '../src/components/Header';
import Hero from '../src/components/Hero';
import Footer from '../src/components/Footer';
import LoginPage from '../src/components/Login';
import SignupPage from '../src/components/Signup';
import AddEntityPage from '../src/components/AddEntityPage';
import ProductsPage from '../src/components/Products'; // Import ProductsPage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/add-entity" element={<AddEntityPage />} />
                    <Route path="/products" element={<ProductsPage />} /> {/* Add route for ProductsPage */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
