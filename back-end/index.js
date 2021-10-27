const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const cors = require("cors");

const app = express();
const dal = require('./db/dal');


// app.set("trust proxy", 1);
// app.use(express.static(path.join(__dirname + "/public")));

var corsOptions = {
  origin:  ['http://localhost:3000', 'http://192.168.1.101:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Set-Cookie",
  exposedHeaders: "Set-Cookie"
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());


app.use(require('cookie-parser')(require('../secrets').session.secret));

app.use(session({
        store: MongoStore.create({
                mongoUrl: require('../secrets').db.connectionString,
                dbName: 'Bello'
        }),
        secret: require('../secrets').session.secret,
        name: 'bello.session',
        resave: false,
        saveUninitialized: false,
        cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 30//,
                // sameSite: "lax",
                // secure: false,
                // httpOnly: false
        }
}));



let routeFiles = ['api/boards', 'api/users'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if (component.configure) component.configure({
                dal
        });
        routeManager.apply(app, component);
});




app.listen(3005, "localhost");