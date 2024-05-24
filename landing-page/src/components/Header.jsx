import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getUsers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Function to handle logout
    const handleLogout = async () => {
        try {
            // Make a POST request to the logout endpoint
            await axios.post('http://localhost:3000/logout');
            document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'accesstoken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
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
            <div className="user-filter">
                <label htmlFor="user-select">Select User: </label>
                <select
                    id="user-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="">--Select User--</option>
                    {users.map(user => (
                        <option key={user._id} value={user.username}>{user.username}</option>
                    ))}
                </select>
            </div>
        </header>
    );
};

export default Header;
