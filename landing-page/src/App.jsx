import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const App = () => {
    return (
        <div>
            <Header />
            <Hero />
            <FeaturedProducts />
            <Footer />
        </div>
    );
};

export default App;
