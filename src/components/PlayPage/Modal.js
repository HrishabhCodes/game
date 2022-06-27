import { TextField, Box, Modal } from "@mui/material";
import React, { useState, useContext } from "react";
import SocketContext from "../../context/socketContext";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";
import "./Play.css";
export default function Modals(props) {
  const ctx = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [room, setRoom] = useState("");

  const createRoom = async () => {
    if (ctx.name !== "" && ctx.RoomId !== "") {
      props.setShowGameChat(true);
      const roomRef = collection(db, "rooms");
      ctx.setHost(true);
      await addDoc(roomRef, {
        roomId: ctx.RoomId,

        users: [{ name: ctx.name, avatar: ctx.avatar, id: ctx.id }],
        messages: [],
        start: false,
      });
    }
  };
  const joinRoom = async () => {
    if (ctx.name !== "" && room !== "") {
      const roomRef = collection(db, "rooms");
      try {
        const roomQuery = await query(roomRef, where("roomId", "==", room));
        const data = await getDocs(roomQuery);
        if (data.docs[0].data().users.length <= 10) {
          const userRef = doc(db, "rooms", data.docs[0].id);

          await updateDoc(userRef, {
            users: [
              ...data.docs[0].data().users,
              { name: ctx.name, avatar: ctx.avatar, id: ctx.id },
            ],
          });
          ctx.setRoom(room);
        } else {
          console.log("room full");
        }
      } catch (error) {
        console.log(error);
      }
      console.log(ctx.RoomId);
      props.setShowGameChat(true);
    }
  };
  return (
    <div className="btn-container">
      <div>
        {props.btn === "search" ? (
          <button className="search-btn" onClick={handleOpen}>
            SEARCH
          </button>
        ) : (
          <button className="create-game" onClick={handleOpen}>
            Create Game
          </button>
        )}
      </div>

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
            },
          }}
        >
          <TextField
            id="filled-basic"
            label="Nick Name"
            variant="filled"
            type="text"
            value={ctx.name}
            placeholder="Enter nick name"
            sx={{
              input: { backgroundColor: "#edebeb", color: "#000000" },
            }}
            onChange={(event) => {
              ctx.setName(event.target.value);
            }}
          />
          {props.btn === "search" ? (
            <div>
              <TextField
                id="filled-basic"
                label="Room ID"
                variant="filled"
                type="text"
                className="room-textfield"
                value={room}
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
                placeholder="Room ID"
                sx={{
                  input: {
                    backgroundColor: "#edebeb",
                    color: "#000000",
                    fontWeight: "bold",
                  },
                }}
              />
              <button className="joinGame" onClick={joinRoom}>
                Join
              </button>
            </div>
          ) : (
            <div>
              <TextField
                id="filled-read-only-input"
                label="Room ID"
                className="room-textfield"
                value={ctx.RoomId}
                variant="filled"
                type="text"
                placeholder="Room ID"
                sx={{
                  input: {
                    backgroundColor: "#edebeb",
                    color: "#000000",
                    fontWeight: "bold",
                  },
                }}
              />
              <button className="joinGame" onClick={createRoom}>
                Create
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
