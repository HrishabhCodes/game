import React, { useEffect, useState, useContext } from "react";
import "./Gamechat.css";
import SocketContext from "../../context/socketContext";
import { db } from "../../firebase";
import { collection, where, query, onSnapshot } from "@firebase/firestore";
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
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("roomId", "==", ctx.RoomId));
    onSnapshot(roomQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        setUserList(doc.data().users);
        ctx.setUser(doc.data().users);
      });
      ctx.setStart(snapshot.docs[0].data().start);
    });
  }, [ctx.RoomId]);

  return (
    <div className={classname}>
      <h2 className="mt-2">Players</h2>
      <h5>Room ID: {ctx.RoomId}</h5>
      <ul className="users-list p-0">
        {userList.map((Data, index) => (
          <li
            className="userData col-11 m-1 me-2 mb-2 d-flex justify-content-between align-items-center"
            style={{ backgroundColor: colors1[index], color: "black" }}
            key={index}
          >
            <div className="fw-bold ms-2">{Data.name}</div>
            {Data.id === id ? <div className="fs-3 me-2">✎</div> : <></>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserData;
