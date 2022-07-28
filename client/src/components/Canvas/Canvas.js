import React, { useEffect, useRef, useState, useContext } from "react";
import { Typography, Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from "./menu";
import "./Canvas.css";
import Chat from "../Gameplay/Chat";
import UserData from "../Gameplay/UserData";
import Timer from "../Timer/Timer";
import SocketContext from "../../context/socketContext";
import io from "socket.io-client";
import { words } from "./word";
const socket = io.connect("https://doodlesy.herokuapp.com");

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

const Canvas = () => {
  const ctx = useContext(SocketContext);
  const [seconds, setSeconds] = useState(60);
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
  const [guessed, setGuessed] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const joinRoom = () => {
    if (ctx.RoomId !== "") {
      socket.emit("join_room", ctx.RoomId);
    }
  };

  useEffect(() => {
    joinRoom();
    const day = new Date();
    ctx.setInitialTime(day.getSeconds());
  }, []);

  let time;
  useEffect(() => {
    if (round === "3") {
      setSeconds(0);
    } else {
      const day = new Date();
      let s;
      time = setInterval(() => {
        const realSecs = day.getSeconds();
        s = realSecs + (60 - ctx.initialTime);
        if (realSecs >= ctx.initialTime) {
          setSeconds(s - 60);
        } else {
          setSeconds(s);
        }
      }, 1000);
    }

    return () => {
      clearInterval(time);
    };
  }, [seconds]);

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
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for drawing
  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  if (ctx.id === current) {
    setTimeout(() => {
      var imageData = canvasRef.current.toDataURL("image/png");
      socket.emit("image", { image_data: imageData, room: ctx.RoomId });
    }, 100);
  }

  const timeOut = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const gameOver = async () => {
    if (turn < ctx.user.length - 1 && round < 3) {
      await timeOut(1000);
      setTurn((prev) => prev + 1);
    } else {
      setTurn(0);
    }
    setGuessed(false);

    if (round === 3 && turn === 0) {
      setRound("3");
      handleOpen();
      ctx.setStart(false);
    }

    setCurrent(ctx.user[turn].id);
    if (ctx.host === true && round !== "3") {
      const WORD = words[Math.floor(Math.random() * words.length)];
      setTimeout(() => {
        socket.emit("word", { WORD, room: ctx.RoomId });
      }, 1100);
    }

    if (turn === 0 && round < 3 && round !== "3") {
      handleOpen();
      setTimeout(() => {
        handleClose();
      }, 3000);
      setRound((prev) => prev + 1);
    }

    for (let i = 0; i <= 10; i++) {
      setTimeout(() => {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }, 100 * i);
    }
  };

  useEffect(() => {
    socket.on("receive_word", (data) => {
      setWord(data.WORD);
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

  useEffect(() => {
    if (round !== "3") {
      if (seconds === 60 || seconds === 0) {
        gameOver();
      }
    }
  }, [seconds]);

  return (
    <div className="container-fluid">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {round === "3" ? (
          <Box sx={style}>
            <div className="fs-1 fw-bold">Game Over</div>
            <Link to="/" className="create-game">
              Home
            </Link>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              style={{ fontWeight: "900" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Round {round}
            </Typography>
          </Box>
        )}
      </Modal>
      <div className="App row" onTouchEnd={endDrawing} onMouseUp={endDrawing}>
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
            <Timer round={round} word={word} id={current} secs={seconds} />
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
        <Chat
          guessed={guessed}
          setGuessed={setGuessed}
          time={seconds}
          current={current}
          word={word}
        />
      </div>
    </div>
  );
};
export default Canvas;
