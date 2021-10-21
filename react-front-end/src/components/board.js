import React from "react";
import "./board.css";

export default function Board() {
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
                        <div className="task-btn"></div>
                    </div>
                </div>
            </div>
            <div className="task-list">
                <div className="list-header"><h3>List 2</h3></div>
                <div className="list-body">
                    <div className="task-card">
                        <p>Card 1</p>
                        <div className="task-btn"></div>
                    </div><div className="task-card">
                        <p>Card 2</p>
                        <div className="task-btn"></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}