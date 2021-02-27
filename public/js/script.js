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



function addToDo() {
    var a = document.getElementById("to-do-list");
    var b = document.createElement("input");

    b.setAttribute("type", "text");
    b.classList.add('listItem');
    b.draggable = "true";

    a.appendChild(b);
}

function addInProgress() {
    var a = document.getElementById("in-progress-list");
    var b = document.createElement("input");

    b.setAttribute("type", "text");
    b.classList.add('listItem');
    b.draggable = "true";

    a.appendChild(b);
}

function addFinished() {
    var a = document.getElementById("finished-list");
    var b = document.createElement("input");

    b.setAttribute("type", "text");
    b.classList.add('listItem');
    b.draggable = "true";

    a.appendChild(b);
}



const list_items = document.querySelectorAll('.listItem');
const lists = document.querySelectorAll('.list');

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