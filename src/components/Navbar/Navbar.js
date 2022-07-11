import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

import {
    Nav,
    NavDropdown,
  } from "react-bootstrap";


const Navbar = (props) => {
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
                {/* <li>
                    <Link to="/" className="navbar-link">Home</Link>
                </li> */}
               
                <li>
                    <Link to="/profile" className="navbar-link">Profile</Link>
                </li>

                <li>
                    <Link to="/About" className="navbar-link">About</Link>
                </li>

                <li>
                    <Link to="/login" className={props.logged_in ? "hidden" :"navbar-link" }>Sign In</Link>
                </li>
                {/* <li>
                <Link to="/login" className={props.logged_in ? "hidden" : "navbar-btn"}>Sign Up</Link>
                </li> */}
            </ul>
           
        </div>

    </div>
  );
};

export default Navbar;
