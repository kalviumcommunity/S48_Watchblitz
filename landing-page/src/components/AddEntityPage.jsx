import React, { useState } from 'react';
import './AddEntityPage.css'; // Import CSS file for AddEntityPage

const AddEntityPage = ({ onAddEntity }) => {
    const [entity, setEntity] = useState('');
    const [entityList, setEntityList] = useState([]); // State to store the list of entities

    const handleChange = (e) => {
        setEntity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (entity.trim() !== '') { // Ensure the entity name is not empty
            const newEntity = entity.trim();
            setEntityList([...entityList, newEntity]); // Add the new entity to the list
            onAddEntity(newEntity); // Call the callback function to handle adding entity
            setEntity(''); // Clear the input field
        }
    };

    return (
        <div className="hero">
            <div className="login-container">
                <h2>Add Entity</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={entity} 
                        onChange={handleChange} 
                        placeholder="Enter entity name" 
                    />
                    <button type="submit">Add</button>
                </form>
                {/* Display the list of added entities */}
                <div>
                    <h3>Entity List</h3>
                    <ul>
                        {entityList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddEntityPage;
