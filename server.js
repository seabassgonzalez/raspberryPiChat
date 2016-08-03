// Set global variables, import dependencies
var express = require('express');
var mongoose = require('mongoose');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// Direct express to static files
app.use(express.static(__dirname + '/public'));

// Direct to mongo database
mongoose.connect("mongodb://127.0.0.1:27017/scotch-chat");

// chat schema, chat model, permit CORS for external access
var ChatSchema = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});

var Chat = mongoose.model("Chat", ChatSchema);

app.all("*", function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-type, Accept, X-Access-Token, X-Key");
  if(req.method == "OPTIONS"){
    res.status(200).end();
  }else{
    next();
  }
});