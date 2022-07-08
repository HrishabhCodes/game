import React, { useEffect, useRef, useState, useContext } from "react";
import { Typography, Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from "./menu";
import "./Canvas.css";
import Chat from "../gameChat/Chat";
import UserData from "../gameChat/UserData";
import Timer from "../Timer/Timer";
import SocketContext from "../../context/socketContext";
import io from "socket.io-client";
import { words } from "./word";
const socket = io.connect("http://localhost:4000");

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
  const [secs, setSecs] = useState(0);
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
    setSecs(60);
    if (ctx.host === true) {
      const Word = words[Math.floor(Math.random() * words.length)];
      setTimeout(() => {
        socket.emit("word", { Word, room: ctx.RoomId });
      }, 800);
    }
    if (turn === 0 && round < 3 && round !== "0") {
      handleOpen();
      setTimeout(() => {
        handleClose();
      }, 1000);
      setRound((prev) => prev + 1);
    }
    if (round === 3 && turn === 0) {
      console.log("game over");
      setRound("0");
      handleOpen();
      ctx.setStart(false);
    }
    setTimeout(() => {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }, 900);
  };

  useEffect(() => {
    socket.on("receive_word", (data) => {
      setWord(data.Word.toLowerCase());
    });

    socket.on("draw_image", (data) => {
      var image = new Image();
      image.src = data;
      image.onload = function () {
        for (let i = 0; i < 2; i++) {
          ctxRef.current.drawImage(image, 0, 0);
        }
      };
    });
  }, [socket]);
  if (ctx.id === current) {
    setTimeout(() => {
      var base64ImageData = canvasRef.current.toDataURL("image/png");
      socket.emit("image", { image_data: base64ImageData, room: ctx.RoomId });
    }, 100);
  }

  useEffect(() => {
    if (round !== "0") {
      if (round <= 3 && !(turn === 0 && round === 0)) {
        setTimeout(() => {
          gameOver();
        }, 10000);
      } else {
        gameOver();
      }
    }
  }, [turn, round]);

  return (
    <div className="container-fluid">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {round === "0" && <div className="fs-1 fw-bold">Game Over</div>}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your score: {ctx.score}
          </Typography>
          {round === "0" && (
            <Link to="/" className="create-game">
              Home
            </Link>
          )}
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
            <Timer
              round={round}
              word={word}
              id={current}
              secs={secs}
              setSecs={setSecs}
            />
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
        <Chat word={word} />
      </div>
    </div>
  );
}
export default Canvas;
