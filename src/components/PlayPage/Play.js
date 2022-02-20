import React, { useState } from "react";
import GameChat from "../gameChat/GameChat";
import "./Play.css";

const Play = () => {
  const [showGameChat, setShowGameChat] = useState(false);
  const CreateGame = () => {
    setShowGameChat(true);
  };
  return (
    <div>
      {!showGameChat ? (
        <div className="play-container">
          <div className="modes">
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Guess It!</div>
            </div>
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Rate It!</div>
            </div>
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Grand Reveal</div>
            </div>
          </div>
          <div className="search-btn">SEARCH</div>
          <button className="create-game" onClick={CreateGame}>
            Create Game
          </button>
        </div>
      ) : (
        <div>
          <GameChat />
        </div>
      )}
    </div>
  );
};

export default Play;
