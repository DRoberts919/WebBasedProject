//script to add board to database

//Mr Potters script for api https://github.com/JaredPotter/grocery-api-2/blob/master/server.js

CreateBoard = async () => {
  // here we create the board or just a fancy div
  // const boardDiv = document.createElement("div");
  // console.log(boardDiv);

  // //add a class to the board for styling
  // boardDiv.classList.add("board");
  // boardDiv.id = "usersBoard";

  // boardDiv.addEventListener("click", () => {
  //   window.location.href = "/boards";
  // });

  // var recentsDiv = document.getElementById("currentBoard");

  // recentsDiv.appendChild(boardDiv);

  const boardFetch = await fetch("http://localhost:3000/api/boards", {
    method: "POST",
  })
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      debugger;
    });
};


redirectBoardPage = () =>{
  window.location.href="/boards";
}