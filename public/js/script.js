
const btnClicked = document.getElementById('boardBtn');
console.log(btnClicked);

// btnClicked.onclick(CreateBoard());


CreateBoard = () =>{
    // here we create the board or just a fancy div
    const boardDiv = document.createElement('div');
    console.log(boardDiv);

    //add a class to the board for styling
    boardDiv.classList.add('board');

    var recentsDiv = document.getElementById('bodyPage');

    recentsDiv.appendChild(boardDiv);
}

