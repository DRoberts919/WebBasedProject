import React from "react";

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
                <div className="list-header">List 1</div>
                <div className="list-body">
                    <div className="task-card">
                        <p>Card 1</p>
                        <div className="task-btn"></div>
                    </div>
                </div>
            </div>
            <div className="task-list">
                <div className="list-header">List 2</div>
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