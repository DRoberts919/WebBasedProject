//script to add board to database

CreateBoard = () => {
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

  fetch("http://localhost:3000/api/6042d8f1a44f1c5b1869534e/boards", {
    method: "POST",
    body: JSON.stringify({
      boardName: "",
    }),
  })
    .then((response) => {
      debugger;
      window.location.reload();
    })
    .catch((error) => {
      debugger;
    });
};
