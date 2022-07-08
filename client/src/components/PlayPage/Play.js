import React, { useState } from "react";
import GameChat from "../gameChat/GameChat";
import "./Play.css";
import Modals from "./Modal";
import { motion } from "framer-motion";

const Play = () => {
  const [showGameChat, setShowGameChat] = useState(false);

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.2 }}
    >
      {!showGameChat ? (
        <div className="play-container">
          <div className="modes">
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Rate It!</div>
            </div>
            <div className="modes-card">
              <div className="modes-img guess"></div>
              <div className="modes-title">Guess It!</div>
            </div>
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Grand Reveal</div>
            </div>
          </div>
          <Modals setShowGameChat={setShowGameChat} btn="create" />
          <Modals setShowGameChat={setShowGameChat} btn="search" />
        </div>
      ) : (
        <GameChat showGC={setShowGameChat} />
      )}
    </motion.div>
  );
};

export default Play;
