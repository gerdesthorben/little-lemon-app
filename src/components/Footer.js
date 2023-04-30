import { Link } from 'react-router-dom';

import './css/Footer.css';
import Logo from '../assets/icons/Logo.svg';

const Footer = () => {
    return (
        <footer className='footer'>
            <img src={Logo} width={150} alt='Logo'></img>
            {/* <ul>
                <li className='title'>Links</li>
                <li><a href='/#home'>Home</a></li>
                <li><a href='/#about'>About</a></li>
                <li><a href='/#menu'>Menu</a></li>
                <li><a href='/#reserve'>Reservation</a></li>
                <li><a href='/#order'>Order Online</a></li>
                <li><a href='/#login'>Login</a></li>
            </ul> */}
            <ul className='footer-menu'>
                <h1 className='title'>Links</h1>
                <li className='footer-item'>
                    <Link to='/' className='footer-links'>Home</Link>
                </li>
                <li className='footer-item'>
                    <Link to='/about' className='footer-links'>About</Link>
                </li>
                <li className='footer-item'>
                    <Link to='/menu' className='footer-links'>Menu</Link>
                </li>
                <li className='footer-item'>
                    <Link to='/reserve' className='footer-links'>Reservation</Link>
                </li>
                <li className='footer-item'>
                    <Link to='/order' className='footer-links'>Order Online</Link>
                </li>
                <li className='footer-item'>
                    <Link to='/login' className='footer-links'>Login</Link>
                </li>
            </ul>

            <ul className='footer-contact'>
                <h1 className='title'>Contact</h1>
                <li>Test Street 5</li>
                <li>Ney York, USA</li>
                <li><Link>+43 158 24859146</Link></li>
                <li><Link>littlelemon@gmail.com</Link></li>
            </ul>

            <ul className='footer-socials'>
                <h1 className='title'>Socials</h1>
                <li><Link to='https://www.instagram.com/'>Instagram</Link></li>
                <li><Link to='https://www.twitter.com/'>Twitter</Link></li>
            </ul>
        </footer >
    );
};
export default Footer;