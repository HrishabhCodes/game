import React from "react";
import "./gameChat.css";
import UserData from "./UserData";
import { TextField, Box } from "@mui/material";
function Lobby({
  socket,
  username,
  room,
  setUsername,
  changeName,
  showLobby,
  StartGame,
}) {
  return (
    <div className="joinArea row" style={{ width: "100vw" }}>
      <h3 className="p-0" style={{ textIndent: "50px" }}>
        Join a chat
      </h3>
      <Box
        className="d-flex justify-content-evenly"
        sx={{
          "& > :not(style)": {
            width: "25ch",
            // backgroundColor: "#edebeb",
          },
        }}
      >
        <TextField
          className="col-5 rounded-pill"
          id="filled-input"
          label="Nick Name"
          variant="filled"
          type="text"
          placeholder="Enate nick name"
          value={username}
          sx={{ input: { backgroundColor: "#edebeb", color: "#000000" } }}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          className="col-5 rounded-pill"
          id="filled-read-only-input"
          InputProps={{
            readOnly: true,
          }}
          label="Room ID"
          variant="filled"
          type="text"
          value={room}
          placeholder="Room ID"
          sx={{ input: { backgroundColor: "#edebeb", color: "#000000" } }}
        />
        <button
          className="btn btn-primary btn-sm rounded-pill text-light"
          onClick={changeName}
        >
          Change Name
        </button>
      </Box>
      {showLobby ? (
        <div
          className="row w-100 justify-content-center"
          style={{ height: "500px" }}
        >
          <div className="col-2"></div>
          <div className="col-4  ">
            <div
              className="me-2 info"
              style={{
                height: "400px",
                overflow: "hidden",
              }}
            >
              <h5 className="m-1">Setting</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-action">
                  Round: 3
                </li>
                <li className="list-group-item list-group-item-action">
                  Draw time: 60
                </li>
                <li className="list-group-item list-group-item-action">
                  language: English
                </li>
                <li className="list-group-item list-group-item-action">
                  Room Id: {room}
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-4 info"
            style={{
              height: "400px",
              overflow: "hidden",
            }}
          >
            <UserData classname={"col-12 users"} socket={socket} room={room} />
          </div>
          <div className="col-2"></div>
          <button
            className="start-game mx-auto col-2"
            onClick={StartGame}
            style={{ height: "60px" }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Lobby;
