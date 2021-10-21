import React from "react";
import {Link} from "react-router-dom";
import "./landing.css";

export default function Landing() {
    return(
        <>
        <div className="section">
            <div className="container">
                <h1 className="text-center">Welcome to Bello</h1>
                <h3 className="text-center sub-head">A simple project management tool for your everyday needs</h3>
            </div>
        </div>
        <div className="section grid">
            <div className="container">
                <h1>Test</h1>
            </div>
        </div>
        <div className="spacer"></div>
        <div className="section primary">
            <div className="container">
                <h1>Ready to Join?</h1>
                <p>Easy project management is right around the corner.</p>
                <Link to="/signup" className="btn solid light">Get Started</Link>
            </div>
        </div>
        </>
    )
}