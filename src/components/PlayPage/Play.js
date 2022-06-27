import React, { useState } from "react";
import GameChat from "../gameChat/GameChat";
import "./Play.css";
import Modals from "./Modal";
const Play = () => {
  const [showGameChat, setShowGameChat] = useState(false);

  return (
    <div>
      {!showGameChat ? (
        <div className="play-container">
          <div className="modes">
            {/* <input type="checkbox" id="guessIt" name="Guess It"> */}
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Guess It!</div>
            </div>
            {/*</input>
             <input type="checkbox" id="grandRevil" name="Grand Revile"> */}
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Rate It!</div>
            </div>
            {/*</input>
             <input type="checkbox" id="rateIt" name="Rate It"> */}
            <div className="modes-card">
              <div className="modes-img"></div>
              <div className="modes-title">Grand Reveal</div>
            </div>
            {/* </input> */}
          </div>
          <Modals setShowGameChat={setShowGameChat} btn="create" />
          <Modals setShowGameChat={setShowGameChat} btn="search" />
        </div>
      ) : (
        <GameChat showGC={setShowGameChat} />
      )}
    </div>
  );
};

export default Play;
