//imports
const http = require("http");
const express = require("express");
const routes = require("./routes/routes");
const path = require("path");
const bodyParser = require("body-parser");
const express_session = require("express-session");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 3000;

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
//this is for the

//database connection
mongoose.connect("mongodb://localhost:27017/TrelloUser", {
  useNewUrlParser: true, //These two are just used to get rid of the warnings/errors
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// (async () => {
//   const response = await User.create({
//     username: "jared",
//     password: "test",
//   });
// })();

//pug viewEngine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/", express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json()); //decode the body thats coming in(JSON)
app.use(cookieParser());
app.use(cors());

//sessions for when we are loged in to the page
app.use(
  express_session({
    secret: "This is a secret",
    saveUninitialized: true,
    resave: true,
  })
);

//routes that are then handled withing our routes.js file
app.get("/", routes.index);
app.get("/login", routes.login);
app.get("/signup", routes.signup);

app.get("/account", async (req, res) => {
  console.log("Cookies: ", req.cookies);
  const token = req.cookies.Authorization.split(" ")[1];
  console.log("token " + token);

  const decodedToken = jwt.decode(token);
  console.log("decoded " + JSON.stringify(decodedToken));
  const userId = decodedToken.id;
  //Todo get user by id from database
  const foundUser = await User.findById(userId);

  // extract the baords array
  const userBoards = foundUser.boards;
  // pass boards array to the account pug page

  res.render("account", { decodedToken, userBoards });
});

app.post("/account", routes.checkUser);
app.get("/boards", routes.boards);

app.get("/boards", async (req, res) => {
  const boardId = req.params.boardId;
  const token = req.cookies.Authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.id;

  //Todo get user by id from database
  const foundUser = await User.findById(userId);
  // extract board by boardId from boards array
  const usersBoard = foundUser.boards;
  // pass board to render

  res.render("boards", { usersBoard });
});
//Don't have to do it this way
// app.post('/boards/:boardId',routes.createboard);

app.post("/api/login", async (req, res) => {
  console.log("/api/login is working");

  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  const userLogin = await User.findOne({ username: username }).lean(); //lean returns a simple json rep of the document

  if (userLogin == null) {
    res.json({ status: "error", error: "Invalid username/password" });
  } else {
    if (await bcrypt.compare(password, userLogin.password)) {
      //its successful it finds the record, then the passwords compare to eachothers even with hash

      const token = jwt.sign(
        {
          id: userLogin._id,
          username: userLogin.username,
        },
        JWT_SECRET,
        console.log("token Created")
      );
      // res.cookie("Authorization", "Bearer" + token);
      res.cookie("Authorization", "UserLogin" + " " + token);

      res.redirect(302, "/account");
    } else {
      res.json({ status: "error", error: "Invalid username/password" });
    }
  }
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  /*
  if(plainTextPassword.length < 5) {
      return res.json({ status: 'error', error: 'Password is too small, Needs to be at least 6 characters'})
  }
  */

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User created successfully", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});
//test commit

// api call to add a board to the users board to the database

app.post("/api/boards", async (req, res) => {
  const token = req.cookies.Authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.id;
  console.log(userId);

  const user = await User.findById(userId); //find the user based off the id
  const boardId = user.boards.length;

  try {
    await user.boards.push({
      board_Id: boardId,
      board_Name: "BoadOne",
      boardLanes: [],
    });
    await user.save();
    res.json();
  } catch (error) {
    res.json({ Message: error });
  }

  //Todo: retireve user with matching userId from the database.

  // add a new board to the array of baords.
});

// app.patch("/api/boards/card", async (req, res) => {
//   const token = req.cookies.Authorization.split(" ")[1];
//   const decodedToken = jwt.decode(token);
//   const userId = decodedToken.id;
//   console.log(userId);

//   const user = await User.findById(userId); //find the user based off the id

//   //Todo: retireve user with matching userId from the database.
//   // add a new board to the array of baords.
//   res.send();
// });

// app.patch("/api/boards/card", (req, res) => {
//   const body = req.body;
// });

//app listening on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
