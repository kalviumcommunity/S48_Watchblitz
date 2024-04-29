import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [userEntities, setUserEntities] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/getUsers');
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };

            fetchUsers();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (selectedUser) {
            const fetchEntitiesByUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/getEntitiesByUser/${selectedUser}`);
                    setUserEntities(response.data);
                } catch (error) {
                    console.error('Error fetching entities by user:', error);
                }
            };

            fetchEntitiesByUser();
        }
    }, [selectedUser]);

    const handleUserChange = userId => {
        setSelectedUser(userId);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout');
            document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'accesstoken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
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
                    <li><Link to="/products">Products</Link></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            {isLoggedIn && (
                <div className="user-dropdown">
                    <select value={selectedUser} onChange={e => handleUserChange(e.target.value)}>
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                </div>
            )}
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
        </header>
    );
};

export default Header;

