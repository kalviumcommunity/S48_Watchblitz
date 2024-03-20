import React from 'react';
import Header from '../src/components/Header'
import Hero from '../src/components/Hero';
import FeaturedProducts from '../src/components/FeaturedProducts';
import Footer from '../src/components/Footer';
import LoginPage from '../src/components/Login';
import SignupPage from '../src/components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Change to `Routes` from `Switch`

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes> {/* Wrap all Route components in a Routes element */}
                    <Route path="/" element={<Hero />} /> {/* Use `element` prop instead of `component` */}
                    <Route path="/login" element={<LoginPage />} /> {/* Use `element` prop instead of `component` */}
                    <Route path="/signup" element={<SignupPage />} /> {/* Use `element` prop instead of `component` */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
