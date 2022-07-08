import React, { useState, useContext, useEffect } from "react";
import "./gameChat.css";
import Canvas from "../Canvas/Canvas";
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
// var word = "";
function GameChat({ showGC }) {
  const ctx = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const [showLobby, setShowLobby] = useState(true);

  // console.log(ctx.RoomId, ctx.name, ctx.active);
  //check if the user details are entered

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
    // console.log(data.docs[0].data().users);
    if (data.docs[0].data().users.length === 1) {
      console.log("delete room");
      const userDoc = doc(db, "rooms", data.docs[0].id);
      await deleteDoc(userDoc);
    }
    ctx.setStart(false);
  };

  const startGame = () => {
    setShow(true);
  };

  useEffect(() => {
    if (ctx.start === true) {
      startGame();
    }
  }, [ctx.start]);

  const Game = async () => {
    const roomRef = collection(db, "rooms");
    const roomQuery = await query(roomRef, where("roomId", "==", ctx.RoomId));
    const data = await getDocs(roomQuery);
    const userRef = doc(db, "rooms", data.docs[0].id);
    await updateDoc(userRef, { start: true });
    // setShow(true);
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
      ) : (
        <Canvas username={ctx.name} />
      )}
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
}
export default GameChat;
