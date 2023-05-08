import { Link } from 'react-router-dom';

import './css/Main.css'
import Header from './Header';

import greekSalat from '../assets/icons/greek salad.jpg';
import bruchetta from '../assets/icons/bruchetta.svg';
import lemonDesert from '../assets/icons/lemon dessert.jpg';
import userImage from '../assets/icons/user-solid.svg';
import detailsSecImage1 from '../assets/icons/restaurant.jpg';
import detailsSecImage2 from '../assets/icons/Mario and Adrian b.jpg';

const Specials = [
    {
        title: 'Greek salad',
        image: greekSalat,
        description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
        price: '$12.99'
    },
    {
        title: 'Bruchetta',
        image: bruchetta,
        description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
        price: '$5.99'
    },
    {
        title: 'Lemon Dessert',
        image: lemonDesert,
        description: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
        price: '$5.00'
    }
];
const Testimonials = [
    {
        rating: '5/5',
        image: userImage,
        name: 'Peter',
        review: 'Amazing food and service! Little Lemon is the perfect spot for a cozy dinner.'
    },
    {
        rating: '4/5',
        image: userImage,
        name: 'James',
        review: 'Delicious food and lovely ambiance. Little Lemon is a great choice for a night out.'
    },
    {
        rating: '3.5/5',
        image: userImage,
        name: 'Branda',
        review: 'Good food and atmosphere, but service could be better. Still worth a visit!'
    },
    {
        rating: '4.8/5',
        image: userImage,
        name: 'John',
        review: 'Highly recommend Little Lemon for their outstanding food and exceptional service.'
    }
];

const Main = () => {
    return (
        <>
            <Header />
            <main className='main'>
                <section className="specials">
                    <div className='specials-top'>
                        <h1>Specials</h1>
                        <Link to='/menu' className='order-button'>Online Menu</Link>
                    </div>
                    <div className='specials-group'>
                        {Specials.map((item, index) => {
                            return (
                                <div key={index} className='specials-item'>
                                    <img src={item.image} alt='specials' width={50} className='specials-image' />
                                    <div className='specials-horizontal'>
                                        <h3 className='specials-h3'>{item.title}</h3>
                                        <p className='price'>{item.price}</p>
                                    </div>
                                    <p className='specials-desc'>{item.description}</p>
                                    <Link to='/order' className='delivery-button'>Order a delivery</Link>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="testimonials">
                    <h1>Testimonials</h1>
                    <div className='testimonials-group'>
                        {Testimonials.map((item, index) => {
                            return (
                                <div key={index} className='testimonials-item'>
                                    <h3>{item.rating} <i className="fa-solid fa-star"></i></h3>
                                    <div className='testimonials-horizontal'>
                                        <img src={item.image} alt='testimonials' width={50} className='testimonials-image' />
                                        <h3 className='testimonials-h3'>{item.name}</h3>
                                    </div>
                                    <p className='testimonials-review'>{item.review}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="details">
                    <div className='details-left'>
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>
                            Welcome to Little Lemon, a family-owned Mediterranean restaurant that brings the flavors of the Mediterranean to your table. Our menu is inspired by traditional family recipes passed down through generations, and our dishes are made with only the freshest and finest ingredients. Our cozy and intimate atmosphere is perfect for a romantic dinner, family gathering, or business meeting. Our friendly and knowledgeable staff is always ready to assist you in choosing the perfect dish or wine to complement your meal. At Little Lemon, we are committed to providing our guests with an unforgettable dining experience. Come join us and taste the Mediterranean!
                        </p>
                    </div>
                    <div className='details-right'>
                        <img className='details-back' src={detailsSecImage1} alt='Restaurant' width={50} />
                        <img className='details-front' src={detailsSecImage2} alt='Restaurant' width={50} />
                    </div>
                </section>
            </main>
        </>
    );
};
export default Main;