import React, { useEffect, useState, useContext, useRef } from "react";
import Chat from "../Gameplay/Chat";
import UserData from "../Gameplay/UserData";
import SocketContext from "../../context/socketContext";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";
import io from "socket.io-client";
import Canvas from "../Canvas/Canvas";
import { Typography, Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { words } from "./word";

const socket = io.connect("https://doodlesy-production.up.railway.app/play");
let ratingSecs = 60;

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

const RateIt = () => {
  const ctx = useContext(SocketContext);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [gameover, setGameover] = useState(false);
  const [current, setCurrent] = useState("");
  const [word, setWord] = useState("");
  const [chance, setChance] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [drawing, setDrawing] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const joinRoom = () => {
    if (ctx.RoomId !== "") {
      socket.emit("join_room", ctx.RoomId);
    }
  };

  useEffect(() => {
    joinRoom();
    changeInitialTime();
    const WORD = words[Math.floor(Math.random() * words.length)];
    setWord(WORD);
  }, []);

  useEffect(() => {
    if (chance === 1) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }

    if (chance > 0 && chance <= ctx.user.length) {
      const roomRef = collection(db, "rooms");
      const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
      onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          const obj = doc.data();
          const id = obj.users[chance - 1].id;
          const url = obj[id].imageData;
          const fetchedWord = obj[id].word;
          setDrawing(url);
          setWord(fetchedWord);
        });
      });
    }

    if (chance < ctx.user.length + 1 && chance !== 0) {
      handleOpen();
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [chance]);

  useEffect(() => {
    if (chance !== 0) {
      displayImage();
    }
  }, [drawing]);

  useEffect(() => {
    if (seconds === 0 && chance === 0) {
      const imageData = canvasRef.current.toDataURL("image/png");
      addImage(imageData);
    }
  }, [seconds]);

  const addImage = async (imageData) => {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
    const data = await getDocs(roomQuery);
    const userRef = doc(db, "rooms", data.docs[0].id);
    const userId = ctx.id;

    await updateDoc(userRef, {
      [userId]: { word, imageData },
    });
  };

  const changeInitialTime = () => {
    const day = new Date();
    const millisecs = day.getTime();
    const secs = Math.floor(millisecs / 1000);
    ctx.setInitialTime(secs);
  };

  const timeOut = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  let time;
  useEffect(() => {
    if (ctx.user.length + 1 === chance) {
      setSeconds(0);
      gameOver();
    } else {
      let s;
      time = setInterval(() => {
        const day = new Date();
        const millisecs = day.getTime();
        const secs = Math.floor(millisecs / 1000);
        s = secs - ctx.initialTime;
        if (s === ratingSecs || (ratingSecs - s < 0 && ratingSecs - s > -5)) {
          changeInitialTime();
          setSeconds(0);
          setChance((prev) => prev + 1);
          ratingSecs = 20;
        } else {
          setSeconds(ratingSecs - s);
        }
      }, 1000);
    }

    return () => {
      clearInterval(time);
    };
  }, [seconds]);

  const displayImage = async () => {
    await timeOut(2000);
    ctxRef.current = canvasRef.current.getContext("2d");
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    var image = new Image();
    image.src = drawing;
    image.onload = function () {
      for (let i = 0; i < 5; i++) {
        ctxRef.current.drawImage(image, 0, 0);
      }
    };
  };

  const gameOver = async () => {
    setGameover(true);
    handleOpen();
  };

  return (
    <div className="container-fluid">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {gameover ? (
          <Box sx={style}>
            <div className="fs-1 fw-bold">Game Over</div>
            <Link to="/" className="create-game">
              Home
            </Link>
            <UserData classname={"col-12 users end"} id={current} />
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              style={{ fontWeight: "900" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {ctx.user[chance - 1] && ctx.user[chance - 1].name}
            </Typography>
          </Box>
        )}
      </Modal>
      <div className="App row">
        <UserData classname={"col-2 users"} id={current} />
        <Canvas
          word={word}
          chance={chance}
          innerRef={canvasRef}
          seconds={seconds}
        />
        <Chat
          chance={chance}
          guessed={guessed}
          setGuessed={setGuessed}
          time={seconds}
          current={current}
          word={word}
          setSeconds={setSeconds}
        />
      </div>
    </div>
  );
};

export default RateIt;
