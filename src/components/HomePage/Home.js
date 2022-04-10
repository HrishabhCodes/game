import React, { useState } from "react";
import "./Home.css";
import UserImage from "../../assets/user-img.jpeg";
import { Link } from "react-router-dom";
import GameChat from "../gameChat/GameChat";

const Home = ({ name, socket, setActive }) => {
  const roomId = "A1";
  const [showGameChat, setShowGameChat] = useState(false);
  const ShowGc = () => {
    setShowGameChat(true);

    socket.emit("joinRoom", { room: roomId, username: name });
    socket.emit("startGame");
    setShowGameChat(true);
  };

  return (
    <div className="home-page-cont">
      {!showGameChat ? (
        <div className="user-cont">
          <Link
            to="/profile"
            className="user-info"
            onClick={() => setActive("profile")}
          >
            <div className="user-img-cont">
              <img className="user-img" src={UserImage} alt="" />
            </div>
            <div className="username">{name}</div>
          </Link>
          <div className="quick-play-cont">
            <Link
              to="/play"
              className="game-info"
              onClick={() => setActive("play")}
            >
              <div className="play-icon">
                <i className="fa-solid fa-play"></i>
              </div>

              <div className="mode-any link-light">
                Game Mode: <strong className="any-word">ANY</strong>
              </div>
            </Link>

            <div className="play-btn" onClick={ShowGc}>
              QUICK PLAY
            </div>
          </div>
        </div>
      ) : (
        <GameChat
          showGC={setShowGameChat}
          Name={name}
          Room={roomId}
          socket={socket}
          modal={setShowGameChat}
          setActive={setActive}
        />
      )}
    </div>
  );
};

export default Home;
