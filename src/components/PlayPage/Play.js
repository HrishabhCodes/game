import React, { useState, useContext } from "react";
import GameChat from "../gameChat/GameChat";
import "./Play.css";
import SocketContext from "../../context/socketContext";
import { TextField, Box, Modal } from "@mui/material";
const Play = () => {
  const ctx = useContext(SocketContext);
  const [showGameChat, setShowGameChat] = useState(false);
  const [username, setUsername] = useState(ctx.name);
  const [room, setRoom] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      ctx.socket.emit("joinRoom", { room: room, username: username });
      ctx.socket.emit("startGame");
      setShowGameChat(true);
    }
  };
  return (
    <div>
      {!showGameChat ? (
        <div className="play-container">
          <div className="modes">
            {/* <input type="checkbox" id="guessIt" name="Guess It"> */}
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Guess It!</div>
            </div>
            {/*</input>
             <input type="checkbox" id="grandRevil" name="Grand Revile"> */}
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Rate It!</div>
            </div>
            {/*</input>
             <input type="checkbox" id="rateIt" name="Rate It"> */}
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Grand Reveal</div>
            </div>
            {/* </input> */}
          </div>
          <div className="search-btn">SEARCH</div>
          <button className="create-game" onClick={handleOpen}>
            Create Game
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className="d-flex flex-column position-absolute top-50 start-50 translate-middle"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "25ch",
                  // backgroundColor: "#edebeb",
                },
              }}
            >
              <TextField
                id="filled-basic"
                label="Nick Name"
                variant="filled"
                type="text"
                value={username}
                placeholder="Enter nick name"
                sx={{
                  input: { backgroundColor: "#edebeb", color: "#000000" },
                }}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <TextField
                id="filled-basic"
                label="Room ID"
                variant="filled"
                type="text"
                placeholder="Room ID"
                sx={{
                  input: { backgroundColor: "#edebeb", color: "#000000" },
                }}
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />

              <button className="joinGame" onClick={joinRoom}>
                Join
              </button>
            </Box>
          </Modal>
        </div>
      ) : (
        <GameChat showGC={setShowGameChat} modal={setOpen} />
      )}
    </div>
  );
};

export default Play;
