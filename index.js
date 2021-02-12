const http = require('http');
const express = require('express');
const routes = require('./routes/routes');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;



app.get('/home',routes.index);














app.listen(3000)