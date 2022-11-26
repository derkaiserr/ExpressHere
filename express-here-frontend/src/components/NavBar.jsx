import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"

const NavBar = () => {
    return (
        <div id="nav-bar">
            <span className="logo">
                <img src={require("../images/logo.png")} alt="logo" />
            </span>

            <nav className="hidden">
                <ul>
                <li><Link className="nav-link" to="/">Discover</Link></li>
                <li><Link className="nav-link" to="/share">Share</Link></li>
                </ul>
            </nav>

            <div className="search-bar">
                <input type="text" name="search-value" placeholder="Search" />
                <i src={require("../images/search-icon.svg")} alt="search-icon" className="icon search-icon"/>
            </div>

            <div id="account-login">
                <button className="secondary-button"><Link to="/login">Login</Link></button>
                <button className="primary-button"><Link to="signup" className="primary">Sign Up</Link></button>
            </div>

            <i className="icon hamburger-icon"></i>
        </div>
    );
}

export default NavBar;
