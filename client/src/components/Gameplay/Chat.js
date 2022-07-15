import React, { useEffect, useState, useRef, useContext } from "react";
import { TextField, Box, Tooltip, Zoom } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { blue } from "@mui/material/colors";
import SocketContext from "../../context/socketContext";
import "./Gamechat.css";
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
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const messagesEndRef = useRef(null);
  const ctx = useContext(SocketContext);
  const WORD = props.word;

  const addMessage = async (message) => {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
    const data = await getDocs(roomQuery);
    const userRef = doc(db, "rooms", data.docs[0].id);

    await updateDoc(userRef, {
      messages: [
        ...data.docs[0].data().messages,
        { username: ctx.name, message: message },
      ],
    });
  };

  const sendMessage = async () => {
    if (currentMessage.toLowerCase() === WORD.toLowerCase()) {
      setTimeout(() => {
        ctx.setScore((prev) => prev + (600 - props.time * 10));
      }, 200);
      addMessage("Guessed the word! 🎉🎉");
      props.setGuessed(true);
    } else {
      addMessage(currentMessage);
    }
    setCurrentMessage("");
  };

  useEffect(() => {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
    onSnapshot(roomQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        setMessagesList(doc.data().messages);
      });
    });
  }, [ctx.RoomId]);

  return (
    <div className="col-3 gameChat">
      <div className="mt-2">
        <h2>GameChat</h2>
      </div>
      <div className="render-chat">
        <ScrollToBottom className="render-chat">
          {messagesList.map((messageData, index) => {
            return (
              <p
                className={
                  messageData.message === "Guessed the word! 🎉🎉"
                    ? "correct"
                    : null
                }
                key={index}
              >
                {messageData.username}: {messageData.message}
              </p>
            );
          })}
        </ScrollToBottom>
      </div>
      <div ref={messagesEndRef} className="message col-11">
        <Box
          className="col-9"
          sx={{
            "& > :not(style)": {
              backgroundColor: "#edebeb",
            },
          }}
        >
          <TextField
            disabled={props.current === ctx.id || props.guessed ? true : false}
            id="standard-basic"
            className="col-12"
            label="Message"
            variant="standard"
            type="text"
            value={currentMessage}
            placeholder="Message"
            sx={{ input: { color: "#000000" } }}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
        </Box>
        <Tooltip
          className="sendButton"
          placement="top"
          title="Send"
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 300 }}
          arrow
        >
          <button onClick={sendMessage} style={{ width: "50px" }}>
            <SendIcon sx={{ color: blue[500], fontSize: 50 }} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
export default Chat;
