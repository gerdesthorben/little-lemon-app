import { Link } from 'react-router-dom';
import { useState } from 'react';

import Dropdown from './Dropdown';
import { Button } from './Button';

import './css/Nav.css'
import NavbarLogo from '../assets/icons/Logo.svg'

const Nav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setShowMenu(!showMenu);
    const closeMobileMenu = () => setShowMenu(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <nav className="navbar">
            <Link
                to='/'
                className='navbar-logo'
                onClick={closeMobileMenu}>
                <img src={NavbarLogo} alt='Logo' width={150} />
            </Link>

            <div className="menu-icon"
                onClick={handleClick}>
                <i className={showMenu ? 'fas fa-times' : 'fas fa-bars'} />
            </div>

            <ul className={showMenu ? 'nav-menu active' : 'nav-menu'} >
                <li className='nav-item'>
                    <Link
                        to='/'
                        className='nav-links first'
                        onClick={closeMobileMenu}>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to='/about' className='nav-links'
                        onClick={closeMobileMenu}>About</Link>
                </li>
                <li className='nav-item'
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}>
                    <Link
                        to='/menu' className='nav-links'
                        onClick={closeMobileMenu}>
                        Menu <i className='fas fa-caret-down' />
                    </Link>
                    {dropdown && <Dropdown />}
                </li>
                <li className='nav-item'>
                    <Link
                        to='/reserve' className='nav-links'
                        onClick={closeMobileMenu}>Reservation</Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to='/order' className='nav-links'
                        onClick={closeMobileMenu}>Order Online</Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>Login</Link>
                </li>
            </ul>
            <Button />
        </nav>
    );
};
export default Nav;