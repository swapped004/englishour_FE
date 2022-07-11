import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';


const NavBar = ({logged_in, Logout_func}) => {
  return (

    <div className="navbar-container">

        <div className="navbar-logo">
            <Link to={logged_in ? "/homepage" : "/"}>
            <img src={require('../../images/logo.png')} alt="logo" />
            </Link>
        </div>

        <div className="hamburger">
        </div>
        <div className="hamburger">
        </div>

        <div className="navbar-menu">
            <ul>
                {/* <li>
                    <Link to="/" className="navbar-link">Home</Link>
                </li> */}
               
                <li>
                    <Link to="/profile" className={logged_in ? "navbar-link" :"hidden" }>Profile</Link>
                </li>

                <li>
                    <Link to="/About" className="navbar-link">About</Link>
                </li>

                <li>
                    <Link to="/login" className={logged_in ? "hidden" :"navbar-link" }>Sign In</Link>
                </li>
                <li>
                    <Link to="/exercise" className={logged_in ? "navbar-link" :"hidden" }>Exercise</Link>
                </li>
                <li>
                    <Link to="/tutorial" className={logged_in ? "navbar-link" :"hidden" }>Tutorial</Link>
                </li>
                <li>
                    <Link to="/" className={logged_in ? "navbar-btn" : "hidden"} onClick={Logout_func}>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default NavBar;
