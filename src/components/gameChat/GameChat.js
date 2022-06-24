import React, { useState, useContext } from "react";
import "./gameChat.css";
import Canvas from "../Canvas/Canvas";
import { Link } from "react-router-dom";
import { Tooltip, Zoom } from "@mui/material";
import Lobby from "./Lobby";
import { blue } from "@mui/material/colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SocketContext from "../../context/socketContext";
var word = "";
function GameChat({ showGC, modal }) {
  const ctx = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const [showLobby, setShowLobby] = useState(true);
  // console.log(ctx.RoomId, ctx.name, ctx.active);
  //check if the user details are entered

  const leaveroom = () => {
    ctx.socket.emit("leave", { room: ctx.RoomId, username: ctx.name });
    setShow(false);
    setShowLobby(false);
    showGC(false);
    modal(false);
  };
  ctx.socket.on("start", (data) => {
    setShow(true);
  });
  const StartGame = () => {
    setShow(true);
    console.log("start game");
    ctx.socket.emit("startGame");
    console.log("start game");
  };
  const changeName = () => {
    ctx.socket.emit("changeName", { username: ctx.name });
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
        <Lobby
          changeName={changeName}
          showLobby={showLobby}
          StartGame={StartGame}
        />
      ) : (
        <Canvas username={ctx.name} word={word} />
      )}
      <Link to="/play" onClick={() => ctx.setActive("play")}>
        <Tooltip
          className="leaveButton "
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
