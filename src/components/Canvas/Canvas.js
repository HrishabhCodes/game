import React, { useEffect, useRef, useState, useContext } from "react";
import { Typography, Box, Modal } from "@mui/material";
import Menu from "./menu";
import "./Canvas.css";
import Chat from "../gameChat/Chat";
import UserData from "../gameChat/UserData";
import Timer from "../Timer/Timer";
import SocketContext from "../../context/socketContext";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

const words = [
  "Argentina",
  "Asia",
  "Asterix",
  "Atlantis",
  "Audi",
  "Australia",
  "BMW",
  "BMX",
  "Bambi",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Canvas() {
  const ctx = useContext(SocketContext);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.5);
  const [turn, setTurn] = useState(0);
  const [current, setCurrent] = useState("");
  const [word, setWord] = useState("");
  const [round, setRound] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const joinRoom = () => {
    if (ctx.RoomId !== "") {
      socket.emit("join_room", ctx.RoomId);
    }
  };

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  useEffect(() => {
    joinRoom();
  }, []);

  // console.log(word);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  // Function for end the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };
  // Function for drawing
  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };
  const gameOver = async () => {
    if (turn < ctx.user.length - 1 && round < 3) {
      setTurn((prev) => prev + 1);
    } else {
      setTurn(0);
    }
    setCurrent(ctx.user[turn].id);
    if (ctx.host === true) {
      const Word = words[Math.floor(Math.random() * words.length)];
      socket.emit("word", { Word, room: ctx.RoomId });
      console.log(Word);
    }
    if (turn === 0 && round < 3) {
      handleOpen();
      setTimeout(() => {
        handleClose();
      }, 1000);
      setRound((prev) => prev + 1);
    }
    console.log(ctx.user, current);
    if (round === 3) {
      console.log("game over");
    }
  };

  useEffect(() => {
    // console.log(current, ctx.id);
    // if (current === ctx.id) {

    // }
    socket.on("receive_word", (data) => {
      console.log("receive", data);
      setWord(data.Word);
    });

    // socket.on("draw_image", (data) => {
    //   console.log("data");
    // });

    socket.on("time", () => {
      gameOver();
      console.log("time");
    });
  }, [socket]);

  // setTimeout(() => {
  //   var base64ImageData = canvasRef.current.toDataURL("image/png");
  //   socket.emit("image", { image_data: base64ImageData, room: ctx.RoomId });
  // }, 500);

  useEffect(() => {
    if (round <= 3 && ctx.host === true) {
      // if (round <= 3 && turn !== 0) {
      // console.log("round", round);
      // console.log("turn " + turn);
      setTimeout(() => {
        socket.emit("game_over", { room: ctx.RoomId });
        // gameOver();
      }, 5000);
    }
    // else {
    //   console.log("game over");
    //   gameOver();
    // }
  }, [turn, round]);

  return (
    <div className="container-fluid">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your score: score
          </Typography>
        </Box>
      </Modal>
      <div className="App row " onTouchEnd={endDrawing} onMouseUp={endDrawing}>
        <UserData classname={"col-2 users"} id={current} />
        <div
          className="draw-area col-7"
          style={{ pointerEvents: ctx.id === current ? "" : "none" }}
        >
          <div
            onMouseMove={draw}
            onTouchMove={draw}
            onTouchStart={startDrawing}
            onMouseDown={startDrawing}
          >
            <Timer sec={15} round={round} word={word} />
            <canvas
              ref={canvasRef}
              width={window.innerWidth * 0.582}
              height={window.innerHeight * 0.7}
            />
          </div>
          <Menu
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            setLineOpacity={setLineOpacity}
            ctx={ctxRef.current}
            canvas={canvasRef.current}
          />
        </div>
        <Chat />
      </div>
    </div>
  );
}
export default Canvas;
