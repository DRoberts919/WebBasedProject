import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import "./landing.css";
import {App } from "./App";
import {AuthContext} from "./App"

function LandingWithOutSession() {
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

function LandingWithSession(){
    return(
        <>
        <div className="session">
            <div className="container">
                <h1 className="text-center">Your Boards</h1>
            </div>
        </div>
        <div className="board-list">
            <Link to="/board/:board_id" className="board-card">
                <div className="color-section"></div>
                <div className="text-section"><p>Board Name</p></div>
            </Link>
        
            <Link to="/board/:board_id" className="board-card">
                <div className="color-section"></div>
                <div className="text-section"><p>Board Name</p></div>
            </Link>
        </div>
        </>
    )
}

function Landing(){
    const authing = useContext(AuthContext)
    useEffect(()=>{
        console.log(authing)
    },[authing])
    return(
        <section>
            {authing.isAuth ? <LandingWithSession /> : <LandingWithOutSession />}
        </section>
    )
}

export default Landing;