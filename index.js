//imports
const http = require('http');
const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');
const express_session = require('express-session');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

const JWT_SECRET = 'suu3hh94sddcd9j$%$#%sfsdfoisje*&*$^8592dfs4kjusfdddsdssfs';


//database connection
mongoose.connect('mongodb://localhost:27017/TrelloUser', {
    useNewUrlParser: true, //These two are just used to get rid of the warnings/errors
    useUnifiedTopology: true,
    useCreateIndex: true
});

//pug viewEngine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/', express.static(path.join(__dirname + '/public')))
app.use(bodyParser.json()) //decode the body thats coming in(JSON)


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


// app.post('/login',(req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;

//   res.send(`Username: ${username} Password: ${password}`);
// });
app.post('/api/change-password', (req, res) => {
  const { token } = req.body;
  try {
  const user = jwt.verify(token, JWT_SECRET)
  } catch(error) {
      res.json({ status: 'error', error: "Don't mess with the info >:L"})
  }
  //console.log('JWT decoded:', user)
  res.json({ status: 'ok' })
})

app.post('/api/login', async (req, res) => {

  const { username, password } = req.body

  const user = await User.findOne({ username }).lean() //lean returns a simple json rep of the document

  if(!user) {
      return res.json({ status: 'error', error: 'Invalid username/password'})
  }

  if(await bcrypt.compare(password, user.password)) {
      //its successful it finds the record, then the passwords compare to eachothers even with hash

      const token = jwt.sign
          ({ 
              id: user._id, 
              username: user.username
          }, 
          JWT_SECRET
      )

      return res.json({ status: 'ok', data: token})
  }

  res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
  console.log(req.body)

  const { username, password: plainTextPassword } = req.body

  if(!username || typeof username !== 'string') {
      return res.json({ status: 'error', error: 'Invalid username'})
  }

  if(!plainTextPassword || typeof plainTextPassword !== 'string') {
      return res.json({ status: 'error', error: 'Invalid password'})
  }

  /*
  if(plainTextPassword.length < 5) {
      return res.json({ status: 'error', error: 'Password is too small, Needs to be at least 6 characters'})
  }
  */

  const password = await bcrypt.hash(plainTextPassword, 10)

  try {
      const response = await User.create({
          username,
          password
      })
      console.log('User created successfully', response)
  } catch(error) {
      if(error.code === 11000) {
          return res.json({ status: 'error', error: 'Username already in use'})
      }
      throw error
  }

  res.json({status: 'ok'})
})
//test commit


//app listening on port 3000
app.listen(port,() => console.info(`Listening on port ${port}`));








