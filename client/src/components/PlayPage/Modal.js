import React, { useState, useContext, useEffect, useRef } from "react";
import { Box, Modal } from "@mui/material";
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

export default function ModalComp(props) {
  const ctx = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [idCopied, setIdCopied] = useState(false);
  const [room, setRoom] = useState("");
  const roomInput = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let id = String(Math.floor(Math.random() * 1000000));
    if (id.length < 6) {
      id = "0".repeat(6 - id.length) + id;
    }
    ctx.setRoom(id);
  }, []);

  const createRoom = async () => {
    if (ctx.name !== "" && ctx.RoomId !== "") {
      let mode;
      mode = props.selModes[Math.floor(Math.random() * props.selModes.length)];
      props.setShowGameChat(true);
      const roomRef = collection(db, "rooms");
      ctx.setHost(true);
      await addDoc(roomRef, {
        mode: mode,
        roomId: ctx.RoomId,
        users: [{ name: ctx.name, avatar: ctx.avatar, id: ctx.id, score: 0 }],
        messages: [],
        start: false,
      });
      const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
      const data = await getDocs(roomQuery);
      ctx.setDocRef(data.docs[0].id);
    }
  };

  const joinRoom = async () => {
    props.setShowGameChat(true);
    if (ctx.name !== "" && room !== "") {
      const roomRef = collection(db, "rooms");
      try {
        const roomQuery = query(roomRef, where("roomId", "==", room));
        const data = await getDocs(roomQuery);
        if (data.docs[0].data().users.length <= 10) {
          const userRef = doc(db, "rooms", data.docs[0].id);
          ctx.setDocRef(data.docs[0].id);
          await updateDoc(userRef, {
            users: [
              ...data.docs[0].data().users,
              { name: ctx.name, avatar: ctx.avatar, id: ctx.id, score: 0 },
            ],
          });
          ctx.setRoom(room);
        } else {
          console.log("room full");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCopy = () => {
    setIdCopied(true);
    roomInput.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
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
              width: "30ch",
            },
          }}
        >
          <label htmlFor="filled-read-only-input">Nick Name</label>
          <input
            id="filled-basic"
            maxLength={15}
            className="name-textfield"
            value={ctx.name}
            placeholder="Nick Name"
            type="text"
            onChange={(event) => {
              ctx.setName(event.target.value);
            }}
          />
          {props.btn === "search" ? (
            <div>
              <label htmlFor="filled-read-only-input">Room ID</label>
              <input
                autoFocus
                id="filled-read-only-input"
                className="room-textfield"
                type="number"
                placeholder="Room ID"
                onChange={(e) => setRoom(e.target.value)}
              />

              <button className="joinGame" onClick={joinRoom}>
                Join
              </button>
            </div>
          ) : (
            <div>
              <label htmlFor="filled-read-only-input">Room ID</label>
              <div className="room-input">
                <input
                  ref={roomInput}
                  id="filled-read-only-input"
                  className="room-textfield"
                  value={ctx.RoomId}
                  type="text"
                  placeholder="Room ID"
                  readOnly
                />
                {idCopied ? (
                  <i className="copy copied fa-solid fa-check"></i>
                ) : (
                  <i onClick={handleCopy} className="copy fa-solid fa-copy"></i>
                )}
              </div>
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
