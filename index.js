//imports
const http = require('http');
const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');
const express_session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const port = 3000;


//database connection
mongoose.connect('mongodb://localhost:27017/TrelloUser', {
    useNewUrlParser: true, //These two are just used to get rid of the warnings/errors
    useUnifiedTopology: true
});

//pug viewEngine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')))


const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});


//sessions for when we are loged in to the page
app.use(express_session({
    secret: "This is a secret",
    saveUninitialized: true,
    resave: true,
  })
);

//routes that are then handled withing our routes.js file
app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/signup',routes.signup);
app.get('/account',routes.account);
app.get('/boards',routes.boards);
//Don't have to do it this way 
// app.post('/boards/:boardId',routes.createboard);


//routes that are then handled withing our routes.js file
app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/signup',routes.signup);
app.get('/account',routes.account);
app.get('/boards',routes.boards);


app.post('/login',(req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  res.send(`Username: ${username} Password: ${password}`);
});



//app listening on port 3000
app.listen(port,() => console.info(`Listening on port ${port}`));







