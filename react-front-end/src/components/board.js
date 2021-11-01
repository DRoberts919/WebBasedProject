import React, {useState, useEffect, useRef} from "react";
import "./board.css";
import { useParams, Redirect } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
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
            setBoard(data);
            let lists = [];
            try {
                lists = JSON.parse(data.taskLists);
            }catch (e){ console.log(e)};
            setTaskLists(lists);
        })
        .catch(err => {
            //Something went wrong
            //Maybe user doesnt own the board
            setRedirect(true);
        })
    }, []);

    useEffect(() => {
        
    }, [board]); 

    useEffect(() => {
        renderListsJSX();
    }, [taskLists]);

    //Save data every 5 seconds

      useInterval(() => {
        if(board && board.board_id) saveDataToDB();
    }, 5000);

    const saveDataToDB = () => {
        const putData = {
            board_id: board.board_id,
            name: board.name,
            user_id: board.user_id,
            taskLists: JSON.stringify(taskLists)

        }
        fetch(`http://localhost:3005/api/board/${board_id}`, {
            credentials: "include",
            method:"PUT",
            mode:"cors",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)

        })
        .catch(err => console.log(err));
    }


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

    function handleOnDragEnd(result) {
        console.log(result);
        if (!result.destination) 
        return;

        let newTaskLists = [...taskLists];
        let reorderedItem;
        newTaskLists.map(list => {
            if(list.list_id === result.source.droppableId) {
               reorderedItem = list.tasks.splice(result.source.index, 1);
            }
        });
        if(reorderedItem) {
            newTaskLists.map(list => {
                if(list.list_id === result.destination.droppableId) {
                    list.tasks.splice(result.destination.index, 0, ...reorderedItem);

                }
            });
        }


        setTaskLists(newTaskLists);
    }

    const renderListsJSX = () => {

        let tempJSX = [];
        if(!taskLists.length || taskLists === []) {
            setTaskListsJSX( <></>);
             return;
            }
        taskLists.forEach((list) => {
            let tasksJSX = [];
            if(list.tasks && list.tasks.length) {
                list.tasks.forEach((task, taskIndex) => {
                    tasksJSX.push(
                        <Draggable key={task.task_id} draggableId={task.task_id} index={taskIndex}>
                            {(provided) => (
                                <div className="task-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <input type="text" value={task.description} onChange={e => updateTaskText(list.list_id, task.task_id, e.target.value)}/>
                                    <div className="task-btn" onClick={() => deleteTask(list.list_id, task.task_id)}><i className="fa fa-trash" aria-hidden="true"></i></div>
                                </div>
                            )}
                        </Draggable>
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
                
                <Droppable droppableId={list.list_id}>
                    {(provided) => (
                        <div className="list-body" {...provided.droppableProps} ref={provided.innerRef}>
                            {tasksJSX}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                

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
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {taskListsJSX}
            </DragDropContext>
            <div onClick={() => {newList()}} className="btn add-list">
                + Add List
            </div>
        </div>
        </>
    )
}

