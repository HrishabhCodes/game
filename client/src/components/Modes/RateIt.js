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

const socket = io.connect("https://doodlesy.herokuapp.com");
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
  }, []);

  useEffect(() => {
    if (chance === 1) {
      setTimeout(() => {
        handleClose();
        // setSeconds(0);
      }, 3000);
      // setChance((prev) => prev + 1);
    }
    if (chance > 0 && chance <= ctx.user.length) {
      const roomRef = collection(db, "rooms");
      const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
      onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          const obj = doc.data();
          const id = obj.users[chance - 1].id;
          const url = obj[id].imageData;
          console.log(obj, url);
          setDrawing(url);
        });
      });
    }

    if (chance < ctx.user.length + 2 && chance !== 0) {
      handleOpen();
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [chance]);

  useEffect(() => {
    if (seconds === 0 && chance === 0) {
      const imageData = canvasRef.current.toDataURL("image/png");
      addImage(imageData);
    }

    if (seconds === 0) {
      setChance((prev) => prev + 1);
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
    if (ctx.user.length + 2 === chance) {
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
          displayImage();
          // if (chance === 1) {
          //   ratingSecs = 3;
          // } else {
          ratingSecs = 20;
          // }
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

  //   useEffect(() => {
  //     socket.on("receive_word", (data) => {
  //       setWord(data.WORD);
  //     });

  //     socket.on("draw_image", (data) => {
  //       var image = new Image();
  //       image.src = data;
  //       image.onload = function () {
  //         for (let i = 0; i < 2; i++) {
  //           ctxRef.current.drawImage(image, 0, 0);
  //         }
  //       };
  //     });
  //   }, [socket]);

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
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              style={{ fontWeight: "900" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {ctx.user[chance - 2] && ctx.user[chance - 2].name}
            </Typography>
          </Box>
        )}
      </Modal>
      <div className="App row">
        <UserData classname={"col-2 users"} id={current} />
        <Canvas innerRef={canvasRef} seconds={seconds} />
        <Chat
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