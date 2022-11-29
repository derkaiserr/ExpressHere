import React, { useState} from "react";
import "../styles/LogPortal.css";
import { Link, useNavigate } from "react-router-dom";
const Login = (props) => {
    const initialData = {userID: "", password: ""}
    const [details, setDetails] = useState(initialData)
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://127.0.0.1:5000/login", {method: "POST", body: JSON.stringify(details), headers: { "Content-Type": "application/json" }})
            let responseJson = await response.json();
            // If a registered user with valid password, login
            console.log(responseJson)
            if (responseJson.status === 200) {
                props.updateUser(responseJson.data)
                props.changeLogStatus(true)
                alert("Successfully logged in!")
                navigate("/") // navigate back to the previous page 
            } else {// If not, re-ask to login
            alert("Email/Password wrong. Try again!")
            setDetails(initialData)
            }
        } catch (err){
            // If any error, re-load the form
            alert("Server error. Try again!")
            console.log(err.message)
        }
    }

    return (<div className="container">
                <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Email" onChange={e => setDetails({...details, userID: e.target.value})} value={details.userID} required={true}/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} required={true}/>
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

