import React, { useState } from "react";
import "./GameChat.css";
import Canvas from "../Canvas/Canvas";
import { Link } from "react-router-dom";
import { Tooltip, Zoom } from "@mui/material";
import Lobby from "./Lobby";
import { blue } from "@mui/material/colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
var word = "";
function GameChat({ showGC, Name, Room, socket, modal, setActive }) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(Name);
  const [showLobby, setShowLobby] = useState(true);

  const room = Room;
  //check if the user details are entered

  const leaveroom = () => {
    socket.emit("leave", { room: room, username: username });
    setShow(false);
    setShowLobby(false);
    showGC(false);
    modal(false);
  };
  socket.on("start", (data) => {
    setShow(true);
  });
  const StartGame = () => {
    setShow(true);
    socket.emit("startGame");
    console.log("start game");
  };
  const changeName = () => {
    socket.emit("changeName", { username: username });
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
          socket={socket}
          username={username}
          room={room}
          setUsername={setUsername}
          changeName={changeName}
          showLobby={showLobby}
          StartGame={StartGame}
        />
      ) : (
        <Canvas socket={socket} username={username} room={room} word={word} />
      )}
      <Link to="/play" onClick={() => setActive("play")}>
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
