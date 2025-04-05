import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/AddAdmin.css';

const AddAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAddAdmin = async () => {
        if (!username || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await addDoc(collection(db, 'admins'), {
                username,
                password,
            });

            alert('New admin added successfully!');
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error adding new admin:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="add-admin-page">
            <button onClick={() => navigate('/admin')} className="back-button">← Back to Admin Panel</button>
            <h2>Add New Admin</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleAddAdmin}>Add Admin</button>
        </div>
    );
};

export default AddAdmin;
