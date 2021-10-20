import React, {useState} from 'react';
import './signup.css';


export default function Signup() {
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [cPasswordErrorMessage, setCPasswordErrorMessage] = useState('');

    const handleClick = () => {
        setNameErrorMessage("Please Enter a Name");
        setEmailErrorMessage("Please Provide an Email");
        setPasswordErrorMessage("Please Enter a Password");
        setCPasswordErrorMessage("Confirm Your Password");
    }

    
    return(
        <div className="signup-wrap">
            <h1>Sign Up</h1>
            <form>
                <label>
                    <p>Name</p>
                    <input type="text" />
                    {nameErrorMessage && <div className="error-message"> {nameErrorMessage} </div>}
                </label>
                <label>
                    <p>Email</p>
                    <input type="text" />
                    {emailErrorMessage && <div className="error-message"> {emailErrorMessage} </div>}
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                    {passwordErrorMessage && <div className="error-message"> {passwordErrorMessage} </div>}
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input type="password" />
                    {cPasswordErrorMessage && <div className="error-message"> {cPasswordErrorMessage} </div>}
                </label>
                <div className="formBtn">
                    <button onClick={handleClick} className="btn solid primary" type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}