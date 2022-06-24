// import items from "./words.js";
const express = require("express");
const uuid = require("uuid");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const item = [
  "dog",
  "cat",
  "phone",
  "table",
  "tea",
  "glasses",
  "pen",
  "pencil",
  "paper",
  "island",
];
app.use(cors());
const server = http.createServer(app);
//setting up CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send({ roomid: uuid.v4() });
});
const users = [];
function startGame(socket, Data) {
  socket.on("startGame", () => {
    io.in(Data.room).emit("userData", users);
    socket.to(Data.room).emit("start");
    io.in(Data.room).emit(
      "word",
      item[Math.floor(Math.random() * item.length)]
    );
  });
}
function changeName(socket, Data) {
  socket.on("changeName", (data) => {
    users[users.findIndex((x) => x.id === Data.id)] = {
      ...users[users.findIndex((x) => x.id === Data.id)],
      username: data.username,
    };
    io.in(Data.room).emit("userData", users);
    socket.to(Data.room).emit("botMessage", {
      username: "Bot",
      message: `${Data.username} changed name to ${data}`,
    });
  });
}
function disconnect(socket, Data) {
  socket.on("disconnect", () => {
    socket.to(Data.room).emit("botMessage", {
      username: "Bot",
      message: `${Data.username} has left the chat`,
    });

    users.splice(users.indexOf(Data.id), 1);
    socket.to(Data.room).emit("userData", users);
  });
}
function leaveRoom(socket) {
  socket.on("leave", (data) => {
    socket.to(data.room).emit("botMessage", {
      username: "Bot",
      message: `${data.username} has left the chat`,
    });
    users.splice(users.indexOf(data.id), 1);
    socket.to(data.room).emit("userData", users);
    io.to(socket.id).emit("userData", []);
  });
}
function joinRoom(socket) {
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
    startGame(socket, Data);
    //listen for change name
    changeName(socket, Data);
    //listen for disconnect
    disconnect(socket, Data);
    //listen for leave room
    leaveRoom(socket);
    socket.on("canvasData", (data) => {
      //console.log("data");
      socket.to(Data.room).emit("canvasDraw", data);
    });
  });
}
//listen for connection
io.on("connection", async (socket) => {
  await joinRoom(socket);

  //listen for send message
  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("reciveMessage", data);
  });
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
