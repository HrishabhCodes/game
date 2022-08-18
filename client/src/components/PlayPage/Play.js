import React, { useState } from "react";
import GameChat from "../Gameplay/Gamechat";
import ModalComp from "./Modal";
import { motion } from "framer-motion";
import Guess from "../../assets/guess.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Play.css";

const modes = [
  {
    name: "Rate It!",
    url: "https://random.imagecdn.app/500/150",
  },
  {
    name: "Guess It!",
    url: "https://random.imagecdn.app/500/150",
  },
  {
    name: "Grand Reveal",
    url: "https://random.imagecdn.app/500/150",
  },
];

const Play = () => {
  const [showGameChat, setShowGameChat] = useState(false);
  const [gameModes, setGameModes] = useState([
    "Rate It!",
    "Guess It!",
    "Grand Reveal",
  ]);
  const [useLess, setUseLess] = useState(0);

  const handleModes = (mode) => {
    if (gameModes.includes(mode)) {
      let num = gameModes.indexOf(mode);
      gameModes.splice(num, 1);
      setGameModes(gameModes);
      setUseLess((prev) => prev + 1);
    } else {
      setGameModes([...gameModes, mode]);
    }
  };

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
            {modes.map((mode, index) => {
              return (
                <div
                  onClick={() => handleModes(mode.name)}
                  key={index}
                  className={
                    gameModes.includes(mode.name)
                      ? "modes-card mode-selected"
                      : "modes-card"
                  }
                >
                  <LazyLoadImage
                    effect="blur"
                    className="modes-img"
                    src={Guess}
                    alt={mode.name}
                  />
                  <div className="modes-title">{mode.name}</div>
                </div>
              );
            })}
          </div>
          <ModalComp
            setShowGameChat={setShowGameChat}
            btn="create"
            selModes={gameModes}
          />
          <ModalComp
            setShowGameChat={setShowGameChat}
            btn="search"
            // selModes={gameModes || ["Rate It!", "Guess It!", "Grand Reveal"]}
            selModes={gameModes}
          />
        </div>
      ) : (
        <GameChat showGC={setShowGameChat} />
      )}
    </motion.div>
  );
};

export default Play;
