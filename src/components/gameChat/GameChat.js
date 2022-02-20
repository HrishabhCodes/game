import React, { useState } from "react";
import io from "socket.io-client";
import "./gameChat.css";
import Canvas from "../Canvas/Canvas";
const socket = io.connect("http://localhost:3001");
function GameChat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);
  //check if the user details are entered
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", { room: room, username: username });
      setShow(true);
    }
  };
  const leaveroom = () => {
    socket.emit("leave", { room: room, username: username });
    setShow(false);
  };

  return (
    <div
      className="col-12  "
      style={{ backgroundColor: "#383838", color: "#ffffff" }}
    >
      <button onClick={leaveroom}>leave</button>
      {!show ? (
        <div>
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="Enate nick name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room no."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Canvas socket={socket} username={username} room={room} />
      )}
    </div>
  );
}
export default GameChat;
