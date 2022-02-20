import React, { useEffect, useState, useRef } from "react";

import "./gameChat.css";
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
      <div>
        <h3>GameChat</h3>
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
      <div ref={messagesEndRef} className="message">
        <input
          type="text"
          value={currentMessage}
          placeholder="message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
