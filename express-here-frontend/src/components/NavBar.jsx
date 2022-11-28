import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css"

const NavBar = (props) => { 
    let navigate = useNavigate()
    const handleBtnClick = (goPath) => {
        if ((props.isLogged && goPath === "/signup") || (props.isLogged && goPath === "/login")){
            return;
        } else if (!props.isLogged && goPath === "/share"){
            navigate("/login")
            return
        }
        navigate(goPath)
    }
    return (
        <div id="nav-bar">
            <span className="logo">
                <img src={require("../images/logo.png")} alt="logo" onClick={() => handleBtnClick("/")}/>
            </span>

            <nav className="hidden">
                <ul>
                <li><button className="nav-link secondary-button" onClick={() => handleBtnClick("/")}>Discover</button></li>
                <li><button className="nav-link secondary-button" onClick={() => handleBtnClick("/share")}>Share</button></li>
                </ul>
            </nav>

            <div className="search-bar">
                <input type="text" name="search-value" placeholder="Search" />
                <i src={require("../images/search-icon.svg")} alt="search-icon" className="icon search-icon"/>
            </div>

            <div id="account-login">
                <button className="secondary-button" onClick={() => handleBtnClick("/login")}>Login</button>
                <button className="primary-button" onClick={() => handleBtnClick("/signup")}>Sign Up</button>
            </div>        
               
            <i className="icon hamburger-icon" onClick={() => handleBtnClick("/userprofile")}></i>
        </div>);
}

export default NavBar;
