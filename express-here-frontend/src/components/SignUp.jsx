import React from "react";
import "../styles/LogPortal.css";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  return (<div className="container">
            <div className="forms-container">
            <div className="signin-signup">
                <form action="#" class="sign-in-form">
                <h2 className="title">Sign Up</h2>
                <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username" />
                </div>
                <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password" />
                </div>
                <Link to="/"><input type="submit" value="Login" className="btn solid" /></Link>
                </form>
                <p>Already have account? <Link to="/login">Log In</Link></p>
            </div>
        </div>

        <div className="panels-container">
            <div className="panel left-panel">
            <div className="panel left-panel">
                <div className="content">
                <h3>WELCOME!</h3>
                <p>
                    REALIZE THAT LISTENING OTHERS' AND SHARING YOURS' STORIES HELPS.
                </p>
                </div>
            </div>
            </div>
            </div>
        </div>
);
};

export default SignUp;

