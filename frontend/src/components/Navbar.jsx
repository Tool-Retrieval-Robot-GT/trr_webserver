import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div>Tool Retrieval Robot</div>
            <ul className='nav-links'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/map">Map</Link>
                </li>
                <li>
                    <Link to="/catalog">Catalog</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

