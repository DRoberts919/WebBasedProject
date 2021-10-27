import React, {useState, useEffect} from "react";
import "./board.css";
import { useParams } from 'react-router-dom';

/* function addToDo() {
  var a = document.getElementById("to-do-list");
  var b = document.createElement("input");

  b.setAttribute("type", "text");
  b.classList.add("listItem");
  b.draggable = "true";

  a.appendChild(b);

  b.addEventListener("dragstart", function () {
    console.log("dragstart");
    draggedItem = b;
    setTimeout(function () {
      b.style.display = "none";
    }, 0);
  });

  b.addEventListener("dragend", function () {
    console.log("dragend");
    setTimeout(function () {
      draggedItem = b;
      draggedItem.style.display = "block";
      draggedItem = null;
    }, 0);
  });
}

function addInProgress() {
  var a = document.getElementById("in-progress-list");
  var b = document.createElement("input");

  b.setAttribute("type", "text");
  b.classList.add("listItem");
  b.draggable = "true";

  a.appendChild(b);

  b.addEventListener("dragstart", function () {
    console.log("dragstart");
    draggedItem = b;
    setTimeout(function () {
      b.style.display = "none";
    }, 0);
  });

  b.addEventListener("dragend", function () {
    console.log("dragend");
    setTimeout(function () {
      draggedItem = b;
      draggedItem.style.display = "block";
      draggedItem = null;
    }, 0);
  });
}

function addFinished() {
  var a = document.getElementById("finished-list");
  var b = document.createElement("input");

  b.setAttribute("type", "text");
  b.classList.add("listItem");
  b.draggable = "true";

  a.appendChild(b);

  b.addEventListener("dragstart", function () {
    console.log("dragstart");
    draggedItem = b;
    setTimeout(function () {
      b.style.display = "none";
    }, 0);
  });

  b.addEventListener("dragend", function () {
    console.log("dragend");
    setTimeout(function () {
      draggedItem = b;
      draggedItem.style.display = "block";
      draggedItem = null;
    }, 0);
  });
}

const list_items = document.querySelectorAll(".listItem");
const lists = document.querySelectorAll(".list");

for (let i = 0; i < list_items.length; i++) {
  const item = list_items[i];

  item.addEventListener("dragstart", function () {
    console.log("dragstart");
    draggedItem = item;
    setTimeout(function () {
      item.style.display = "none";
    }, 0);
  });

  item.addEventListener("dragend", function () {
    console.log("dragend");
    setTimeout(function () {
      draggedItem.style.display = "block";
      draggedItem = null;
    }, 0);
  });
}
for (let j = 0; j < lists.length; j++) {
  const list = lists[j];

  list.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  });

  list.addEventListener("dragenter", function (e) {
    e.preventDefault();
    this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  });

  list.addEventListener("dragleave", function (e) {
    this.style.backgroundColor = "rgba(0, 0, 0, 0)";
  });

  list.addEventListener("drop", function (e) {
    console.log("drop");
    this.append(draggedItem);
    this.style.backgroundColor = "rgba(0, 0, 0, 0)";
  });
} */

function addToList() {

}

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