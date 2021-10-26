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

app.use(cors());

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
        resave: false,
        saveUninitialized: true,
        cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                sameSite: 'lax',
                secure: 'false'
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