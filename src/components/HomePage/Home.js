import React, { useContext, useState } from "react";
import "./Home.css";
import UserImage from "../../assets/user-img.jpeg";
import { Link } from "react-router-dom";
import GameChat from "../gameChat/GameChat";
import SocketContext from "../../context/socketContext";
const Home = () => {
  const [showGameChat, setShowGameChat] = useState(false);
  const ctx = useContext(SocketContext);
  // console.log("nae", ctx);
  const ShowGc = () => {
    setShowGameChat(true);

    ctx.socket.emit("joinRoom", { room: ctx.RoomId, username: ctx.name });
    ctx.socket.emit("startGame");
    setShowGameChat(true);
  };

  return (
    <div className="home-page-cont">
      {!showGameChat ? (
        <div className="user-cont">
          <Link
            to="/profile"
            className="user-info"
            onClick={() => ctx.setActive("profile")}
          >
            <div className="user-img-cont">
              <img className="user-img" src={UserImage} alt="" />
            </div>
            <div className="username">{ctx.name}</div>
          </Link>
          <div className="quick-play-cont">
            <Link
              to="/play"
              className="game-info"
              onClick={() => ctx.setActive("play")}
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
        <GameChat showGC={setShowGameChat} modal={setShowGameChat} />
      )}
    </div>
  );
};

export default Home;
