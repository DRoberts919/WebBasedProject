import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {AuthContext} from "./App"
import './login.css';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const authing = useContext(AuthContext);

    const handleClick = () => {
        setErrorMessage("Email and Password do not match");
    }

    const postLogin = event => {
        event.preventDefault();

        //check all fields for errors
        //if no error, then run code below
        if(!/\w+@\w+\.\w+/.test(identifier)) {
            setErrorMessage("Email and Password do not match");
        } else if(!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
            setErrorMessage("Email and Password do not match");
        } else {
            const postData = {
                identifier,
                password
            }
            fetch("http://localhost:3005/api/auth", {
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
                    setErrorMessage("Credentials not found.")
                }
            });
        }
    }
    if(redirect) {
        return(
            <Redirect to="/" />
        )
    }
    return(
        <div className="login-wrap">
            <h1>Log In</h1>
            <form onSubmit={postLogin}>
                <label>
                    <p>Email</p>
                    <input type="text" name="identifier" onInput={(event) => {setIdentifier(event.target.value);}} value={identifier} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password"onInput={(event) => {setPassword(event.target.value);}} value={password} />
                    {errorMessage && <div className="error-message"> {errorMessage} </div>}
                </label>
                <div className="formBtn">
                    <button onClick={handleClick} className="btn solid primary" type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}