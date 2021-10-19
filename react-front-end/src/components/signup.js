import React from 'react';
import './signup.css';

export default function signup() {
    return(
        <div className="signup-wrap">
            <h1>Sign Up</h1>
            <form>
                <label>
                    <p>Name</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Email</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}