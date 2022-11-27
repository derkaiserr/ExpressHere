import React, { useState } from "react";
import "../styles/LogPortal.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = (user, isLogged) => {
    const initialData = {userID: "", name:"", password: ""}
    const [details, setDetails] = useState(initialData)
    let navigate = useNavigate()
    const handleSubmit = async () => {
        const response = await fetch("http://127.0.0.1:3001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(details),
        })

        const responseJson = await response.json();

        console.log(responseJson)

        // If user is not registered in database, signin
        if (responseJson.status === 200) {
            isLogged.setisLogged(true)
            user.setUser(responseJson.data)
            console.log(responseJson.data)
            navigate("-1") // navigate back to the previous page   
        } else {// If not, re-ask to signin
          setDetails(initialData)
          console.log("not added")
        }
    }
    return (<div className="container">
                <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form" onSubmit={() => handleSubmit()}>
                    <h2 className="title">Sign Up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Your Name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} required="true"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Email" onChange={e => setDetails({...details, userID: e.target.value})} value={details.userID} required="true"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} required="true"/>
                    </div>
                    <input type="submit" value="SIGN IN" className="btn solid" />
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

