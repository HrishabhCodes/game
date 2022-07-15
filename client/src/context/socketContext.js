import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
let firstName = `Player${Math.floor(Math.random() * 10000)}`;
if (firstName.length < 4) {
  firstName = "0".repeat(4 - firstName.length) + firstName;
}

const SocketContext = React.createContext({
  name: "",
  setName: () => {},
  RoomId: "",
  setRoom: () => {},
  id: "",
  host: "",
  setHost: () => {},
  start: "",
  setStart: () => {},
  user: [],
  setUser: () => {},
  turn: 0,
  setTurn: () => {},
  score: 0,
  setScore: () => {},
  avatar: 1,
  setAvatar: () => {},
  initialTime: 0,
  setInitialTime: () => {},
});

const uuid = uuidv4();
export const SocketContextProvider = (props) => {
  const [name, setName] = useState(localStorage.getItem("name") || firstName);
  const [roomId, setRoomId] = useState("");
  const [start, setStart] = useState(false);
  const [user, setUser] = useState([]);
  const [turn, setTurn] = useState(0);
  const [score, setScore] = useState(0);
  const [host, setHost] = useState("");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || 1);
  const [initialTime, setInitialTime] = useState(0);

  return (
    <SocketContext.Provider
      value={{
        name: name,
        setName: setName,
        RoomId: roomId,
        setRoom: setRoomId,
        id: uuid,
        host: host,
        setHost: setHost,
        start: start,
        setStart: setStart,
        user: user,
        setUser: setUser,
        turn: turn,
        setTurn: setTurn,
        score: score,
        setScore: setScore,
        avatar: avatar,
        setAvatar: setAvatar,
        initialTime: initialTime,
        setInitialTime: setInitialTime,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketContext;
