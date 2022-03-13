import React, { useEffect, useState } from "react";
import "./GameChat.css";
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
function UserData({ classname, socket, room }) {
  const [userList, setUserList] = useState([]);
  let List = [];
  //get user data from server and set it to userList
  useEffect(() => {
    socket.on("userData", (data) => {
      setUserList((list) => [...data]);
      console.log(data);
    });
  }, [socket]);
  //filr userList to get only users in the same room
  List = userList.filter(function (item) {
    return item.room === room;
  });

  return (
    <div className={classname}>
      <h2 className="mt-2">Players</h2>
      <h5>Room ID: {room}</h5>
      <ul className="p-0">
        {List.map((Data, index) => (
          <li
            className="userData col-11 m-1 me-2 mb-2"
            style={{ backgroundColor: colors1[index], color: "black" }}
            key={index}
          >
            {Data.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserData;
