import React, { useEffect, useState } from "react";
import "./gameChat.css";
function UserData({ socket, room }) {
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
    <div className="col-2 users">
      <p>players</p>
      <p>Room ID:{room}</p>
      <ul>
        {List.map((Data, index) => (
          <li className="userData" key={index}>
            {Data.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserData;
