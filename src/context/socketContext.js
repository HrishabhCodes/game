// import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// const socket = io.connect("http://localhost:4000");
const avatarRef = ref(storage, `avatars/${2}.png`);
// const URL = "";
// getDownloadURL(avatarRef)
//   .then((url) => {
//     URL = url;
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const SocketContext = React.createContext({
  name: "",
  setName: () => {},
  active: "",
  setActive: () => {},
  RoomId: "",
  setRoom: () => {},
  avatar: 1,
  users: [],
  setUsers: () => {},
  id: "",
  host: "",
  setHost: () => {},
  start: "",
  setStart: () => {},
  turn: 0,
  setTurn: () => {},
  score: 0,
  setScore: () => {},
  image: "",
  setImage: () => {},
});
const uuid = uuidv4();
export const SocketContextProvider = (props) => {
  // const [name, setName] = useState(localStorage.getItem("name"));
  const [name, setName] = useState("blue");
  const [roomId, setRoomId] = useState("");
  const [active, setActive] = useState("home");
  const [users, setUsers] = useState([]);
  const [host, setHost] = useState();
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(0);
  const [score, setScore] = useState(0);
  // const [image, setImage] = useState(URL);
  useEffect(() => {
    axios.get("http://localhost:4000/").then(function (response) {
      let id = String(response.data.roomid);
      if (id.length < 6) {
        id = "0".repeat(6 - id.length) + id;
      }
      setRoomId(id);
    });
  }, []);
  // console.log(roomId);
  return (
    <SocketContext.Provider
      value={{
        name: name,
        setName: setName,
        active: active,
        setActive: setActive,
        RoomId: roomId,
        setRoom: setRoomId,
        avatar: 1,
        users: users,
        setUsers: setUsers,
        id: uuid,
        host: host,
        setHost: setHost,
        start: start,
        setStart: setStart,
        turn: turn,
        setTurn: setTurn,
        score: score,
        setScore: setScore,
        // image: image,
        // setImage: setImage,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketContext;
