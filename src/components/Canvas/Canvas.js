import React, { useEffect, useRef, useState, useContext } from "react";
import { Typography, Box, Modal } from "@mui/material";
import Menu from "./menu";
import "./Canvas.css";
import Chat from "../gameChat/Chat";
import UserData from "../gameChat/UserData";
import Timer from "../Timer/Timer";
import SocketContext from "../../context/socketContext";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //const classname="col-2 users";
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
  //console.log(word);
  // Function for starting the drawing
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
  // console.log("canvas");
  const gameOver = async () => {
    if (turn < ctx.user.length - 1 && round < 3) {
      console.log("next round");
      setTurn((prev) => prev + 1);
    } else {
      setTurn(0);
    }
    if (turn === 0 && round < 3) {
      // console.log("open");
      handleOpen();
      setTimeout(() => {
        handleClose();
        // console.log("close");
      }, 1000);
      setRound((prev) => prev + 1);
    }
    setCurrent(ctx.user[turn].id);
    console.log(turn, ctx.id === current, round, ctx.user, ctx.id, current);
    // if (ctx.id === current) {
    //   setWord(words[Math.floor(Math.random() * words.length)]);
    //   // console.log(word);
    // }
    if (round === 3) {
      console.log("game over");
    }
  };
  // useEffect(() => {
  //   // console.log("canvas");
  //   gameOver();
  // }, []);
  useEffect(() => {
    if (round <= 3) {
      // if (round <= 3 && turn !== 0) {
      // console.log("round", round);
      console.log("turn " + turn);
      setTimeout(() => {
        gameOver();
      }, 10000);
    }
    // else {
    //   console.log("game over");
    //   gameOver();
    // }
  }, [turn, round]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // border: "2px solid #000",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
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
          // style={{ pointerEvents: "none" }}
        >
          <div
            onMouseMove={draw}
            onTouchMove={draw}
            onTouchStart={startDrawing}
            onMouseDown={startDrawing}
          >
            <Timer sec={15} round={round} />
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
