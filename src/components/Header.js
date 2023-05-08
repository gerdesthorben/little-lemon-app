import { Link } from 'react-router-dom';

import restaurantImage from '../assets/icons/restauranfood.jpg';
import './css/Header.css'

const Header = () => {
    return (
        <header className='header'>
            <div className='header-left'>
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
                    Welcome to Little Lemon, a family-owned Mediterranean restaurant that serves authentic dishes with the freshest ingredients. Our passion for food is matched only by our commitment to excellent service, making us a favorite spot for both casual and special occasions. Reserve a table today and experience the warmth of our hospitality and the richness of our cuisine.
                </p>
                <div className='header-button'>
                    <Link to='/reserve' className='header-button-text'>Reserve a Table</Link>
                </div>
            </div >
            <div className='header-right'>
                <img src={restaurantImage} alt='Restaurant' />
            </div>
        </header >
    );
};
export default Header;