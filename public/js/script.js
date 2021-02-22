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




const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');

let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    item.addEventListener('dragstart', function () {
        console.log('dragstart');
        draggedItem = item;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0);
    });

    item.addEventListener('dragend', function () {
        console.log('dragend');
        setTimeout(function () {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });

    for (let j = 0; j < lists.length; j++) {
        const list = lists[j];

        list.addEventListener('dragover' ,function (e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });

        list.addEventListener('dragenter', function(e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });

        list.addEventListener('dragleave', function(e) {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        });

        list.addEventListener('drop', function (e) {
            console.log('drop');
            this.append(draggedItem);
            this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        });
    }
}