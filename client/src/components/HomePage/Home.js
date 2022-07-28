import React, { useContext, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import GameChat from "../Gameplay/Gamechat";
import SocketContext from "../../context/socketContext";
import Logo from "../../assets/logo_doodle.png";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const [showGameChat, setShowGameChat] = useState(false);
  const avatar = localStorage.getItem("avatar") || 1;
  const ctx = useContext(SocketContext);
  ctx.setStart(false);

  return (
    <>
      <motion.div
        className="home-page-cont"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="logo">
          <LazyLoadImage
            effect="blur"
            className="vert-move"
            src={Logo}
            alt=""
          />
        </div>
        {!showGameChat ? (
          <div className="user-cont">
            <Link to="/profile" className="user-info">
              <LazyLoadImage
                effect="blur"
                className="user-img"
                src={`avatars/${avatar}.png`}
                alt="avatar"
              />
              <div className="username">{ctx.name}</div>
            </Link>
            <div className="quick-play-cont">
              <Link to="/play" className="game-info">
                <div className="play-icon">
                  <i className="fa-solid fa-play"></i>
                </div>

                <div className="mode-any link-light">
                  Game Mode: <strong className="any-word">ANY</strong>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <GameChat showGC={setShowGameChat} modal={setShowGameChat} />
        )}
      </motion.div>
    </>
  );
};

export default Home;
