import React, { useState, useContext, useEffect } from "react";
import "./Gamechat.css";
import Canvas from "../Modes/GuessIt";
import { Link } from "react-router-dom";
import { Tooltip, Zoom } from "@mui/material";
import Lobby from "./Lobby";
import { blue } from "@mui/material/colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SocketContext from "../../context/socketContext";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  where,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";
import RateIt from "../Modes/RateIt";
import GrandReveal from "../Modes/GrandReveal";

const GameChat = ({ showGC }) => {
  const ctx = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const [showLobby, setShowLobby] = useState(true);
  const [Mode, setMode] = useState();
  // useEffect(() => {

  //   }
  // }, [ctx.mode]);

  const leaveroom = async () => {
    setShow(false);
    setShowLobby(false);
    showGC(false);
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
    const data = await getDocs(roomQuery);
    const index = data.docs[0].data().users.filter((obj) => obj.id !== ctx.id);

    const userRef = doc(db, "rooms", data.docs[0].id);

    await updateDoc(userRef, {
      users: index,
    });

    if (data.docs[0].data().users.length === 1) {
      const userDoc = doc(db, "rooms", data.docs[0].id);
      await deleteDoc(userDoc);
    }
    ctx.setStart(false);
  };

  const startGame = () => {
    setShow(true);
  };

  const reload = (e) => {
    e.preventDefault();
    leaveroom();
    return (e.returnValue = "Are you sure you want to exit?");
  };

  useEffect(() => {
    if (ctx.start === true) {
      startGame();
      window.addEventListener("beforeunload", reload);
    }

    return () => {
      window.removeEventListener("beforeunload", reload);
    };
  }, [ctx.start]);

  const Game = async () => {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
    const data = await getDocs(roomQuery);
    const userRef = doc(db, "rooms", data.docs[0].id);
    await updateDoc(userRef, { start: true });
  };
  return (
    <div
      className="col-12 "
      style={{
        backgroundColor: "transparent",
        color: "#ffffff",
        display: "flex",
      }}
    >
      {!show ? (
        <Lobby showLobby={showLobby} StartGame={Game} />
      ) : ctx.mode === "Guess It!" ? (
        <Canvas />
      ) : ctx.mode === "Rate It" ? (
        <RateIt />
      ) : (
        <GrandReveal />
      )}
      {/* {!show ? (
        <Lobby showLobby={showLobby} StartGame={Game} />
      ) : (
        <Canvas username={ctx.name} />
      )} */}

      <Link to="/">
        <Tooltip
          className="leaveButton"
          title="Leave"
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 300 }}
          arrow
        >
          <button type="submit" onClick={leaveroom}>
            <CloseRoundedIcon fontSize="large" sx={{ color: blue[50] }} />
          </button>
        </Tooltip>
      </Link>
    </div>
  );
};
export default GameChat;
