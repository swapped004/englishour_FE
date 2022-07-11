import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';


const Navbar = ({logged_in, Logout_func}) => {
  return (
    <div className="navbar-container">

        <div className="navbar-logo">
            <Link to="/">
            <img src={require('../../images/logo.png')} alt="logo" />
            </Link>
        </div>

        <div className="hamburger">
        </div>

        <div className="navbar-menu">
            <ul>
                <li>
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
               
                <li>
                    <Link to="/help" className="navbar-link">Help</Link>
                </li>

                <li>
                    <Link to="/about" className="navbar-link">About</Link>
                </li>

                <li>
                    <Link to="/login" className={logged_in ? "hidden" :"navbar-link" }>Sign In</Link>
                </li>
                <li>
                    <Link to="/register" className={logged_in ? "hidden" : "navbar-btn"}>Sign Up</Link>
                </li>

                <li>
                    <Link to="/login" className={logged_in ? "navbar-btn" : "hidden"} onClick={Logout_func}>Logout</Link>
                </li>
            </ul>
           
        </div>

    </div>
  );
};

export default Navbar;
