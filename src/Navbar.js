// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>EcoFitStyle</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/bodyshape">Body Shape</Link></li>
                <li><Link to="/suggestions">Outfit Ideas</Link></li>
                <li><Link to="/donate">Donate</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
