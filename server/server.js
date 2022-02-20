const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
//setting up CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const users = [];
//listen for connection
io.on("connection", (socket) => {
  //Join Room
  socket.on("joinRoom", (Data) => {
    Data = { ...Data, id: socket.id };
    socket.join(Data.room);
    socket.to(Data.room).emit("botMessage", {
      username: "Bot",
      message: `${Data.username} has joined the chat`,
    });

    users.push(Data);
    io.in(Data.room).emit("userData", users);
    //listen for disconnect
    socket.on("disconnect", () => {
      socket.to(Data.room).emit("botMessage", {
        username: "Bot",
        message: `${Data.username} has left the chat`,
      });

      users.splice(users.indexOf(Data.id), 1);
      socket.to(Data.room).emit("userData", users);
    });
    //listen for leave room
    socket.on("leave", (data) => {
      socket.to(data.room).emit("botMessage", {
        username: "Bot",
        message: `${data.username} has left the chat`,
      });

      users.splice(users.indexOf(data.id), 1);
      socket.to(data.room).emit("userData", users);
    });
  });
  //listen for send message
  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("reciveMessage", data);
  });
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
