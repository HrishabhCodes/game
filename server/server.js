const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const json = require("./words.json");
const items = json.items;
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
let userTurn = 0;
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
    //listen for start game
    socket.on("startGame", () => {
      io.in(Data.room).emit("userData", users);
    });
    socket.on("start", () => {
      socket.to(Data.room).emit("start");
      io.in(Data.room).emit(
        "word",
        items[Math.floor(Math.random() * items.length)]
      );
      io.in(Data.room).emit("userData", users);
    });
    socket.on("canvasData", (data) => {
      //console.log("data");
      socket.to(Data.room).emit("canvasDraw", data);
    });
    //listen for change name
    socket.on("changeName", (data) => {
      users[users.findIndex((x) => x.id === Data.id)] = {
        ...users[users.findIndex((x) => x.id === Data.id)],
        username: data.username,
      };
      io.in(Data.room).emit("userData", users);
    });
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
      io.to(socket.id).emit("userData", []);
    });

    socket.on("roundOver", () => {
      socket.to(Data.room).emit("roundOver");
      io.to(users[userTurn].id).emit("turn");
      console.log(users[userTurn].id);
      if (userTurn === users.length - 1) {
        userTurn = 0;
      } else {
        userTurn++;
      }
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
