import React, {useState, useEffect} from "react";
import "./board.css";
import { useParams, Redirect } from 'react-router-dom';

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
    const [taskLists, setTaskLists] = useState([]);
    const [taskListsJSX, setTaskListsJSX] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3005/api/board/${board_id}`, {credentials: "include", method:"GET", mode:"cors"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setBoard(data);
            setTaskLists(data.taskLists === '' ? [] : data.taskLists);
        })
        .catch(err => {
            //Something went wrong
            //Maybe user doesnt own the board
            setRedirect(true);
        })
    }, []);

    useEffect(() => {
        renderListsJSX();
    }, [taskLists]);

    const genId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    const addNewTask = (list_id) => {
        let newTaskLists = [...taskLists];
        newTaskLists.forEach(list => {
            if(list_id === list.list_id) {
                list.tasks.push(			
                    {
                    task_id: genId(),
                    description:"New Task"
                    }
                );
            }
        });
        console.log(newTaskLists);
        setTaskLists(newTaskLists);
        

    }
    const newList = () => {
        //create a new list here
        setTaskLists([...taskLists, {
            list_id: genId(),
            listName: "New List",
            tasks: [ ]
            }]);

       
    }
    const updateTaskText = (list_id, task_id, newText) => {
        let newTaskLists = [...taskLists];
        let parentList;
        newTaskLists.forEach(list => {
            if(list_id === list.list_id) {
                parentList = list;
            }
        });
        if(parentList)parentList.tasks.forEach(task => {
            if(task.task_id === task_id) {
                task.description = newText;
            }
        });
        setTaskLists(newTaskLists);
    }
    const deleteTask = (list_id, task_id) => {
        let newTaskLists = [...taskLists];
        let parentList;
        newTaskLists.forEach(list => {
            if(list_id === list.list_id) {
                parentList = list;
            }
        });
        parentList.tasks = parentList.tasks.filter((task) => (task.task_id != task_id));
        setTaskLists(newTaskLists);
    }
    const deleteList = (list_id) => {
        if(taskLists.length === 1 && taskLists[0].list_id === list_id) {
            setTaskLists([]);
            return;
        }
        let newTaskLists = [...taskLists];
        
        newTaskLists = newTaskLists.filter((list) => (list.list_id != list_id));
        setTaskLists(newTaskLists);
    }
    const updateListHeader = (list_id, value) => {
        let newTaskLists = [...taskLists];
        newTaskLists.forEach(list => {
            if(list_id === list.list_id) {
                list.listName = value;
            }
        });
       
        setTaskLists(newTaskLists);
    }

    const renderListsJSX = () => {
        

        let tempJSX = [];
        console.log(taskLists);
        if(!taskLists.length || taskLists === []) {
            setTaskListsJSX( <></>);
             return;
            }
        taskLists.forEach((list) => {
            let tasksJSX = [];
            if(list.tasks && list.tasks.length) {
                list.tasks.forEach((task) => {
                    tasksJSX.push(
                        <div className="task-card" id={task.task_id}>
                            <input type="text" value={task.description} onChange={e => updateTaskText(list.list_id, task.task_id, e.target.value)}/>
                            <div className="task-btn" onClick={() => deleteTask(list.list_id, task.task_id)}><i className="fa fa-trash" aria-hidden="true"></i></div>
                        </div>
                    );
                });
            }
            tasksJSX.push(
                <div onClick={() => addNewTask(list.list_id)} className="btn add-task"> + Add Task</div>
            );
            tempJSX.push(
                <div className="task-list" id={list.list_id}>
                <div className="list-header">
                    <input type="text" value={list.listName} onChange={e => updateListHeader(list.list_id, e.target.value)}/>
                    <div className="list-btn" onClick={() => deleteList(list.list_id)}><i className="fa fa-trash" aria-hidden="true"></i></div>
                    </div>
                <div className="list-body">
                    {tasksJSX}
                </div>
            </div>
            );
        });
        setTaskListsJSX(tempJSX);

    }

    
    if(redirect) return <Redirect to="/" />
    return(
        <>
        <div className="section">
            <div className="container">
                <h2 className="text-center">{board && board.name ? board.name : ""}</h2>
            </div>
        </div>
        <div className="list-container">
            {taskListsJSX}
            <div onClick={() => {newList()}} className="btn add-list">
                + Add List
            </div>
        </div>
        </>
    )
}

