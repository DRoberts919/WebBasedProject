import React, { useState } from 'react';
import './login.css';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = () => {
        setErrorMessage("Email and Password do not match");
    }


    const postLogin = event => {
        event.preventDefault();

        //check all fields for errors
        //if no error, then run code below

        const postData = {
            identifier: identifier.current.value,
            password: password.current.value
        }
        fetch("/api/auth", {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then( response => {
            if(response.ok)  {
                // checkAuth();
                // setPageState("success");
            }
            // else setPageState("error");
        });
    }

    return(
        <div className="login-wrap">
            <h1>Log In</h1>
            <form onSubmit={postLogin}>
                <label>
                    <p>Email</p>
                    <input type="text" name="identifier" onInput={(event) => {setIdentifier(event.target.value);}} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password"onInput={(event) => {setPassword(event.target.value);}} />
                    {errorMessage && <div className="error-message"> {errorMessage} </div>}
                </label>
                <div className="formBtn">
                    <button onClick={handleClick} className="btn solid primary" type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}