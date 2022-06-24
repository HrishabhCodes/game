import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import axios from "axios";
const socket = io.connect("http://localhost:4000");

const SocketContext = React.createContext({
  socket: socket,
  name: "",
  setName: () => {},
  active: "",
  setActive: () => {},
  RoomId: "",
});
export const SocketContextProvider = (props) => {
  // const [name, setName] = useState(localStorage.getItem("name"));
  const [name, setName] = useState("blue");
  const [roomId, setRoomId] = useState("");
  const [active, setActive] = useState("home");

  useEffect(() => {
    axios.get("http://localhost:4000/").then(function (response) {
      setRoomId(response.data.roomid);
    });
  }, []);
  console.log(roomId);
  return (
    <SocketContext.Provider
      value={{
        name: name,
        setName: setName,
        socket: socket,
        active: active,
        setActive: setActive,
        RoomId: "A1",
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketContext;
