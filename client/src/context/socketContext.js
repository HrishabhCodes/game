import React, { useState } from "react";
// import { storage } from "../firebase";
// import { ref, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
let firstName = `Player${Math.floor(Math.random() * 10000)}`;
if (firstName.length < 4) {
  firstName = "0".repeat(4 - firstName.length) + firstName;
}

// const avatarRef = ref(storage, `bgmusic.mp3`);
// const URL = "";
// getDownloadURL(avatarRef)
//   .then((url) => {
//     console.log(url);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

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
});
const uuid = uuidv4();
export const SocketContextProvider = (props) => {
  const [name, setName] = useState(localStorage.getItem("name") || firstName);
  const [roomId, setRoomId] = useState("");
  // const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [user, setUser] = useState([]);
  const [turn, setTurn] = useState(0);
  const [score, setScore] = useState(0);
  const [host, setHost] = useState("");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || 1);

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
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketContext;
