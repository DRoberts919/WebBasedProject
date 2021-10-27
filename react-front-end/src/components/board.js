import React, {useState, useEffect} from "react";
import "./board.css";
import { useParams } from 'react-router-dom';

export default function Board() {
    const { board_id } = useParams();
    const [board, setBoard] = useState({});

    // useEffect(() => {
    //     fetch(`http://localhost:3005/api/board/${board_id}`, {credentials: "include"})
    //     .then(response => response.json())
    //     .then(data => {
    //         setBoard(data);
    //     })
    //     .catch(err => console.log(err))
    // }, []);

    useEffect(() => {

        // fetch("http://localhost:3005/api/board", {
        //     credentials: "same-origin",
        //     method: 'POST', 
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({name: "bardssadfdsaf"})
        // }).then( response => {
        //     console.log(response);
            
        // });
        fetch('http://localhost:3005/api/auth', {
            credentials:"include",
            mode: "cors",
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(error => console.log(error));



        // }).then(response => console.log(response));
    }, []);

    return(
        <>
        <div className="section">
            <div className="container">
                <h2 className="text-center">Project Name</h2>
            </div>
        </div>
        <div className="list-container">
            <div className="task-list">
                <div className="list-header"><h3>List 1</h3></div>
                <div className="list-body">
                    <div className="task-card">
                        <p>Card 1</p>
                        <div className="task-btn"><i className="fa fa-trash" aria-hidden="true"></i></div>
                    </div>
                </div>
            </div>
            <div className="task-list">
                <div className="list-header"><h3>List 2</h3></div>
                <div className="list-body">
                    <div className="task-card">
                        <p>Card 1</p>
                        <div className="task-btn"><i className="fa fa-trash" aria-hidden="true"></i></div>
                    </div><div className="task-card">
                        <p>Card 2</p>
                        <div className="task-btn"><i className="fa fa-trash" aria-hidden="true"></i></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}