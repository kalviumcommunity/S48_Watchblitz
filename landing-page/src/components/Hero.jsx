import React from 'react';
import './Hero.css'; // Import Hero.css file

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Welcome to WatchBlitz</h1>
                <p>Discover the finest collection of watches</p>
                <div className="search-bar">
                    <input type="text" placeholder="Search for watches..." />
                    <button>Search</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
