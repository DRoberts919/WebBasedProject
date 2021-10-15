//script to add board to database

//Mr Potters script for api https://github.com/JaredPotter/grocery-api-2/blob/master/server.js

CreateBoard = async () => {

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