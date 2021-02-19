const btnClicked = document.getElementById('boardBtn');
console.log(btnClicked);

// btnClicked.onclick(CreateBoard());


CreateBoard = () =>{
    // here we create the board or just a fancy div
    const boardDiv = document.createElement('div');
    console.log(boardDiv);

    //add a class to the board for styling
    boardDiv.classList.add('board');
    boardDiv.id = 'usersBoard';
    

    var recentsDiv = document.getElementById('currentBoard');

    recentsDiv.appendChild(boardDiv);
}



function addToDo(){
    var ul = document.getElementById("to-do-list");
    var toDoInput = document.getElementById("toDoInput");
    var li = document.createElement("li");
    li.setAttribute('id',toDoInput.value);
    li.appendChild(document.createTextNode(toDoInput.value));
    ul.appendChild(li);
}

function addInProgress(){
    var ul = document.getElementById("in-progress-list");
    var inProgressInput = document.getElementById("inProgressInput");
    var li = document.createElement("li");
    li.setAttribute('id',inProgressInput.value);
    li.appendChild(document.createTextNode(inProgressInput.value));
    ul.appendChild(li);
}

function addFinished(){
    var ul = document.getElementById("finished-list");
    var finishedInput = document.getElementById("finishedInput");
    var li = document.createElement("li");
    li.setAttribute('id',finishedInput.value);
    li.appendChild(document.createTextNode(finishedInput.value));
    ul.appendChild(li);
}
