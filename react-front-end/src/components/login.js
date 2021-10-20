import React from 'react';
import './login.css';

export default function Login() {
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
                </label>
                <div className="formBtn">
                    <button className="btn solid primary" type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}