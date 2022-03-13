import React, { useEffect, useState, useRef } from "react";
import { TextField, Box, Tooltip, Zoom } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { blue } from "@mui/material/colors";

import "./GameChat.css";
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    //check if the message is empty
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
      };

      socket.emit("sendMessage", messageData);
      setMessagesList((list) => [...list, messageData]);
      //sending custom message to server
      if (currentMessage === "hi") {
        const BotMsg = {
          room: room,
          username: "Bot",
          message: "Hello",
        };
        socket.emit("sendMessage", BotMsg);
        setMessagesList((list) => [...list, BotMsg]);
      }
      setCurrentMessage("");
    }
  };
  //update the message list when the server sends a message
  useEffect(() => {
    socket.on("reciveMessage", (data) => {
      setMessagesList((list) => [...list, data]);
    });
    socket.on("botMessage", (data) => {
      setMessagesList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="col-3  gameChat">
      <div className="mt-2">
        <h2>GameChat</h2>
      </div>
      <div className="render-chat">
        <ScrollToBottom className="render-chat">
          {messagesList.map((messageData, index) => {
            return (
              <p key={index}>
                {messageData.username}: {messageData.message}
              </p>
            );
          })}
        </ScrollToBottom>
      </div>
      <div ref={messagesEndRef} className="message col-11">
        {/* <div  style={{ backgroundColor: "#edebeb" }}> */}
        <Box
          className="col-9"
          sx={{
            "& > :not(style)": {
              backgroundColor: "#edebeb",
            },
          }}
        >
          <TextField
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
}
export default Chat;
