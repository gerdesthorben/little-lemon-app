import React from 'react';
import { Link } from 'react-router-dom';

import './css/Button.css';

export function Button() {
    return (
        <Link to='login'>
            <button className='btn'>Log In</button>
        </Link>
    );
}