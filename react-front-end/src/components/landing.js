import React, {useContext, useEffect, useState} from "react";
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
    const [boards, setBoards] = useState([]);
    const [boardCount, setBoardCount] = useState(0);
    const [boardsJSX, setBoardsJSX] = useState(<></>);
    const [newBoardName, setNewBoardName] = useState("AHHHHH");
    //fetch all boards for user
    useEffect(() => {
        fetch("http://localhost:3005/api/boards", {credentials: "include", mode:"cors"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setBoards(data);
        })
        .catch(err => console.log(err))
    }, [boardCount]);

    useEffect( () => {
        renderBoardJSX();
    },[boards]);

    const renderBoardJSX = () => {
        let tempJSX = [];

        boards.forEach(board => {
            tempJSX.push
            (<Link to={`/board/${board.board_id}`} className="board-card">
                <div className="color-section"></div>
                <div className="text-section"><p>{board.name}</p></div>
            </Link>);
        });
        console.log(tempJSX);
        setBoardsJSX( tempJSX);
    }
    const addBoard = () => {
        
        fetch("http://localhost:3005/api/board", {
            method: 'POST', 
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newBoardName})
        })
        .then(response => {
            if(response.ok) {
                //Force board list to rerender
                setBoardCount(boardCount+ 1);
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <>
        <div className="session">
            <div className="container">
                <h1 className="text-center">Your Boards</h1>
            </div>
        </div>
        <div className="board-list">
            {/* <Link to="/board/:board_id" className="board-card">
                <div className="color-section"></div>
                <div className="text-section"><p>Board Name</p></div>
            </Link>
        
            <Link to="/board/:board_id" className="board-card">
                <div className="color-section"></div>
                <div className="text-section"><p>Board Name</p></div>
            </Link> */}
            {boardsJSX}
        </div>
        <div className="add-board-btn" onClick={() => {addBoard()}}>Add Board</div>
        </>
    )
}

function Landing(){
    const authing = useContext(AuthContext)
    useEffect(()=>{
        // console.log(authing)
    },[authing])
    useEffect(()=>{
        authing.checkAuth();
    },[])
    return(
        <section>
            {authing.isAuth ? <LandingWithSession /> : <LandingWithOutSession />}
        </section>
    )
}

export default Landing;