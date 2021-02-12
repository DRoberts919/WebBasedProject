//imports
const http = require('http');
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

//stattic folders
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));



// app.get('/',routes.index);
app.get('',(req,res) =>{
    res.sendFile(__dirname + '/views/index.html')
});










//app listening on port 3000
app.listen(port,() => console.info(`Listening on port ${port}`));







