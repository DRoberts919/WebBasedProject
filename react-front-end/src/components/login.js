import React, { useState } from 'react';
import './login.css';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = () => {
        setErrorMessage("Email and Password do not match");
    }

    return(
        <div className="login-wrap">
            <h1>Log In</h1>
            <form>
                <label>
                    <p>Email</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                    {errorMessage && <div className="error-message"> {errorMessage} </div>}
                </label>
                <div className="formBtn">
                    <button onClick={handleClick} className="btn solid primary" type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}