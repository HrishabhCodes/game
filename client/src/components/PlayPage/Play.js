import React, { useState } from "react";
import GameChat from "../gameChat/GameChat";
import Modals from "./Modal";
import { motion } from "framer-motion";
import Guess from "../../assets/guess.png";
import Coming from "../../assets/coming-soon.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Play.css";

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
              <LazyLoadImage
                effect="blur"
                className="modes-img"
                src={Coming}
                alt=""
              />
              <div className="modes-title">Rate It!</div>
            </div>
            <div className="modes-card">
              <LazyLoadImage
                effect="blur"
                className="modes-img guess"
                src={Guess}
                alt=""
              />
              <div className="modes-title">Guess It!</div>
            </div>
            <div className="modes-card">
              <LazyLoadImage
                effect="blur"
                className="modes-img"
                src={Coming}
                alt=""
              />
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
