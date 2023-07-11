const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 4000;

// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

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
  });

  socket.on("image", (data) => {
    io.in(data.room).emit("draw_image", data.image_data);
  });
});

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("listening on port ", port);
});
