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



// routes


// index file
  // send index.html from public directory
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// Create random content generator for initial chat history
  // Instantiate list of messages
  // Iterate through the list of messages
    // Randomly select a message from the array of messages
      // Send message as current content
      // Remove list of messages -- pop or delete I guess
app.contentGenerator('/', function(){

});

// Create random username generator for initial chat history
app.usernameGenerator('/', function(){

});

// Create random roomname generator for initial chat history
app.roomnameGenerator('/', function(){

});

// Run on launch to generate initial chat history
  // Make an array of chat objects formatted same as above
app.post('/setup', function(req, res){
  var chatData = [
  {
    created: new Date(),  
    content: contentGenerator();
    username: usernameGenerator();
    room: roomnameGenerator();
  }, {
    created: new Date(),
    content: contentGenerator();
    username: usernameGenerator();
    room: roomnameGenerator();
  }, {
    created: new Date(),
    content: contentGenerator();
    username: usernameGenerator();
    room: roomnameGenerator();
  }, {
    created: new Date(),
    content: contentGenerator();
    username: usernameGenerator();
    room: roomnameGenerator();
  }

}];

// Loop through each chat data
  // Create a new instance of the chat model
  // call save to insert the chat
for(var i=0; i < chatData.length; i++){
  var newChat = new Chat(chatData[i]);
  newChat.save(function(err, savedChat){
    console.log(savedChat);
  });
}
// Send response
res.send('created');
});





