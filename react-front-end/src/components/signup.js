import React, {useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import {AuthContext} from "./App"
import './signup.css';


export default function Signup() {
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [cPasswordErrorMessage, setCPasswordErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const [redirect, setRedirect] = useState('');
    const authing = useContext(AuthContext);

    const handleNameError = () => {
        if(!/^[a-zA-Z- ]+$/.test(name)) {
            setNameErrorMessage("Name Invalid");
        } else {
            setNameErrorMessage("");
        }
    }

    const handleEmailError = () => {
        if(!/\w+@\w+\.\w+/.test(email)) {
            setEmailErrorMessage("Email Invalid");
        } else {
            setEmailErrorMessage("");
        }
    }

    const handlePasswordError = () => {
        if(!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
            setPasswordErrorMessage("Password Invalid");
        } else {
            setPasswordErrorMessage("");
        }
    }

    const handleCPasswordError = () => {
        if(password !== cPassword){
            setCPasswordErrorMessage("Passwords do not match");
        } else {
            setCPasswordErrorMessage("");
        }
    }

    const postSignup = event => {
        event.preventDefault();

        //check all fields for errors
        //if no error, then run code below
        if(!/\w+@\w+\.\w+/.test(email)) {
            setEmailErrorMessage("Unable to use Email");
        } else if(!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
            setPasswordErrorMessage("Invalid Password");
        } else if(!/^[a-zA-Z- ]+$/.test(name)) {
            setNameErrorMessage("Name not available")
        } else {
            const postData = {
                email,
                name,
                password
            }
            fetch("http://localhost:3005/api/user", {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            }).then( response => {
                console.log(response);
                if(response.ok)  {
                    authing.checkAuth();
                    setRedirect(true);
                }
                else {
                    setErrorMessage("User Already Exist.")
                }
            });
        }
    }
    if(redirect) {
        return(
            <Redirect to="/" />
        )
    }
        // regex: /\w+@\w+\.\w+/}, 
		// regex: /^[a-zA-Z- ]+$/}, 
		// regex: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/}
    return(
        <div className="signup-wrap">
            <h1>Sign Up</h1>
            <form onSubmit={postSignup}>
                <label>
                    <p>Name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleNameError}/>
                    {nameErrorMessage && <div className="error-message"> {nameErrorMessage} </div>}
                </label>
                <label>
                    <p>Email</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailError}/>
                    {emailErrorMessage && <div className="error-message"> {emailErrorMessage} </div>}
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handlePasswordError}/>
                    {passwordErrorMessage && <div className="error-message"> {passwordErrorMessage} </div>}
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input type="password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} onBlur={handleCPasswordError}/>
                    {cPasswordErrorMessage && <div className="error-message"> {cPasswordErrorMessage} </div>}
                </label>
                <div className="formBtn">
                    {errorMessage && <div className="error-message"> {errorMessage} </div>}
                    <button className="btn solid primary" type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}