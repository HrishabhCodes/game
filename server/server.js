const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send({ roomid: Math.floor(Math.random() * 1000000) });
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
