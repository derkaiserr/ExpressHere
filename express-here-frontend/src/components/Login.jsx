import React, { useState} from "react";
import "../styles/LogPortal.css";
import { Link, useNavigate } from "react-router-dom";
const Login = (userDetails, isLogged) => {
    const [details, setDetails] = useState({id: "", password: ""})
    const navigate = useNavigate()
    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3001/login", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(details),
        })
        const responseJson = await response.json();
        // If a registered user with valid password, login
        if (responseJson.status === 200) {
            isLogged.setisLogged(true)
            userDetails.setUser(responseJson.message)
            navigate("-1") // navigate back to the previous page 
        } else {// If not, re-ask to login
          setDetails({id: "", password: ""})
        }
    }

    return (<div className="container">
                <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form" onSubmit={()=> handleSubmit()}>
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Email/Phone" onChange={e => setDetails({...details, id: e.target.value})} value={details.id} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                    </div>
                    <input type="submit" value="LOG IN" className="btn solid" />
                    </form>
                    <p>Don't have account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                            <h3>WELCOME BACK!</h3>
                            <p>
                                REALIZE THAT LISTENING OTHERS' AND SHARING YOURS' STORIES HELPS.
                            </p>
                        </div>
                </div>
                </div>
            </div>
    );
};

export default Login;

