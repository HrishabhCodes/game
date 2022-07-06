const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("game_over", (data) => {
    io.in(data.room).emit("time");
  });

  socket.on("word", (data) => {
    io.in(data.room).emit("receive_word", data);
    console.log(data);
  });

  // socket.on("image", (data) => {
  //   io.in(data.room).emit("draw_image", data.image_data);
  // });
});

app.get("/", (req, res) => {
  res.send({ roomid: Math.floor(Math.random() * 1000000) });
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
