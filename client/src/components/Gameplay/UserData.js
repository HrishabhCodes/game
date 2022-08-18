import React, { useEffect, useContext } from "react";
import "./Gamechat.css";
import SocketContext from "../../context/socketContext";
import { db } from "../../firebase";
import {
  collection,
  where,
  query,
  onSnapshot,
  getDocs,
} from "@firebase/firestore";
const colors1 = [
  "#9ADCFF",
  "#FFF89A",
  "#FFB2A6",
  "#4FD3C4",
  "#FF8AAE",
  "#E0DDAA",
  "#BFFFF0",
  "#8BDB81",
  "#FF9F45",
  "#F3C5C5",
];

const UserData = ({ classname, id }) => {
  const ctx = useContext(SocketContext);

  useEffect(() => {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
    onSnapshot(roomQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        ctx.setUser(doc.data().users);
      });
      ctx.setMode(snapshot.docs[0].data().mode)
      ctx.setStart(snapshot.docs[0].data().start);
    });
  }, [ctx.RoomId]);

  return (
    <div className={classname}>
      <h2 className="players-heading">Players</h2>
      <h5 className="room-id">Room ID: {ctx.RoomId}</h5>
      <ul className="users-list p-0">
        {ctx.user.map((data, index) => (
          <li
            className="user-data"
            style={{ backgroundColor: colors1[index], color: "black" }}
            key={index}
          >
            <div className="name-container">
              <div className="name fw-bold">{data.name}</div>
              {ctx.start ? (
                <div className="score">Points: {data.score}</div>
              ) : null}
            </div>
            {data.id === id ? <div className="pencil">✎</div> : <></>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserData;
