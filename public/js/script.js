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

    b.addEventListener('dragstart', function () {
        console.log('dragstart');
        draggedItem = b;
        setTimeout(function () {
            b.style.display = 'none';
        }, 0);
    });
    
    b.addEventListener('dragend', function () {
        console.log('dragend');
        setTimeout(function () {
            draggedItem = b;
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });
}

function addInProgress() {
    var a = document.getElementById("in-progress-list");
    var b = document.createElement("input");

    b.setAttribute("type", "text");
    b.classList.add('listItem');
    b.draggable = "true";

    a.appendChild(b);

    b.addEventListener('dragstart', function () {
        console.log('dragstart');
        draggedItem = b;
        setTimeout(function () {
            b.style.display = 'none';
        }, 0);
    });
    
    b.addEventListener('dragend', function () {
        console.log('dragend');
        setTimeout(function () {
            draggedItem = b;
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });
}

function addFinished() {
    var a = document.getElementById("finished-list");
    var b = document.createElement("input");

    b.setAttribute("type", "text");
    b.classList.add('listItem');
    b.draggable = "true";

    a.appendChild(b);

    b.addEventListener('dragstart', function () {
        console.log('dragstart');
        draggedItem = b;
        setTimeout(function () {
            b.style.display = 'none';
        }, 0);
    });
    
    b.addEventListener('dragend', function () {
        console.log('dragend');
        setTimeout(function () {
            draggedItem = b;
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });
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
}
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

//Phill's Static JS

var regform = document.getElementById('reg-form');
if (regform) {
    regform.addEventListener('submit', registerUser)
}
//fetch is a utility used by browsers to make HTTP calls
async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value; //Want the value and not the DOM because stores as empty objects
    const password = document.getElementById('password').value;

    //Grabs from the input fields and pass it along the stringify function
    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if(result.status === 'ok') {
        //alert('Success')
        
    } else {
        alert(result.error)
    }

    console.log(result);
}

var loginform = document.getElementById('login');
if (loginform) {
    loginform.addEventListener('submit', login);
}

async function login(event) {
    event.preventDefault()
    const username = document.getElementById('username').value; //Want the value and not the DOM because stores as empty objects
    const password = document.getElementById('password').value;

    //Grabs from the input fields and pass it along the stringify function
    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if(result.status === 'ok') {
        console.log('Got the token:', result.data)
        localStorage.setItem('token', result.data) //can persist on refreshes as well
        //alert('Success')
        window.location.href = "/account"
        
    } else {
        alert(result.error)
    }

    console.log(result);
}

// var changeform = document.getElementById('change-form');
// if (changeform) {
//     changeform.addEventListener('submit', registerUser)
// }
// //fetch is a utility used by browsers to make HTTP calls
// async function registerUser(event) {
//     event.preventDefault()
//     const password = document.getElementById('password').value;

//     //Grabs from the input fields and pass it along the stringify function
//     const result = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             newpassword: password,
//             token: localStorage.getItem('token')
//         })
//     }).then((res) => res.json())

//     if(result.status === 'ok') {
//         //alert('Success')
//     } else {
//         alert(result.error)
//     }

//     console.log(result);
// }
