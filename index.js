const express = require('express')
const app = express()
const hostname = '0.0.0.0';
const port = 8080;
const WebSocket = require('ws'); 
const fs = require('fs');
app.use(express.urlencoded());


// Server static files and run server
sendFileOptions = {
  root: __dirname
}

app.use(express.static('public'))


app.get('/', (req,res) =>
  res.sendFile("index.html", sendFileOptions))

app.get('/student', (req, res) => 
  res.sendFile('student.html', sendFileOptions))

app.get('/teacher', (req,res) =>
  res.sendFile('teacher.html', sendFileOptions))

app.get('/letters', (req,res) =>
  res.sendFile("letters.html", sendFileOptions))





app.listen(port, () => console.log(`Started on port ${port}!`))


// Establish web socket connection 
// and listen for messages

const wss = new WebSocket.Server({port: 82});

var clients = []; 
var count = 0;

wss.on('connection', function(ws) { 
  var num = count++; 
  client = {
    ws:ws,
    id:num
  }; 
  
  clients[num] = client; 
  //ws.send("{msg:'got connection'}");

  ws.on('message',function(msg){ 
    for(var i in clients){ 
      clients[i].ws.send(msg); 
    } 
  }); 

  ws.on('close',function(msg){ 
    delete clients[num]; 
  });

});