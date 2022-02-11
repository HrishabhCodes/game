import React from "react";
import "./Play.css";

const Play = () => {
  return (
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
      <div className="create-game">Create Game</div>
    </div>
  );
};

export default Play;
