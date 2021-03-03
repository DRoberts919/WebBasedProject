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

//pug viewEngine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/", express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json()); //decode the body thats coming in(JSON)
app.use(cookieParser());

const urlEncodedParser = bodyParser.urlencoded({
  extended: true,
});

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

app.get("/account", (req, res) => {
  console.log("Cookies: ", req.cookies);
  const token = req.cookies.Authorization.split(" ")[1];
  console.log(token);

  const decodedToken = jwt.decode(token);
  console.log(decodedToken);

  

  const userInfo = {
      'username': decodedToken.username,
      'id': decodedToken.id
  }

  res.render("account",{userInfo});
});

app.post("/account", routes.checkUser);
app.get("/boards", routes.boards);
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
          board: userLogin.board
        },
        JWT_SECRET
      );
      res.cookie("Authorization", "Bearer " + token);

      // res.json({ status: 'ok', data: token})
      //   res.json({ status: "ok", data: token });

      //   req.session.user = userLogin;

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

//app listening on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
