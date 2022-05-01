import React, { useEffect, useState } from 'react';
import './navbar.css';
import netflixLogo from './assets/img/Netflix_2015_logo.svg.png';
const Navbar = () => {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, []);
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className='nav__logo'
                src={netflixLogo}
                alt='Netflix Logo'
            />
            <img
                className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt='Netflix Logo'
            />

        </div>
    )
}

export default Navbar