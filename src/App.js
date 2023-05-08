import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './components/css/styles.css';

import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import About from './components/pages/About';
import Menu from './components/pages/Menu';
import Reservation from './components/pages/Reservation';
import Order from './components/pages/Order';
import Login from './components/pages/Login';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/about' exact element={<About />} />
        <Route path='/menu' exact element={<Menu />} />
        <Route path='/reserve' exact element={<Reservation />} />
        <Route path='/order' exact element={<Order />} />
        <Route path='/login' exact element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
