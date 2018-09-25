
var http = require("http");
var express = require("express");
var fs = require("fs");
var app = express();
var server = http.Server(app);
var io = require("socket.io").listen(server);

var todolist = [];


app.get("/", function(req, res) {
  fs.readFile("views/client.html", "utf-8", function(error, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});


io.sockets.on("connection", socket => {
  
  io.emit("update todolist", todolist);

  
  socket.on("add todo", newTodo => {
    todolist.push(newTodo);
    io.emit("update todolist", todolist);
  });
  
  
  socket.on("delete todo", index => {
    todolist.splice(index, 1);
    io.emit("update todolist", todolist);
  });
});

server.listen(8080);
