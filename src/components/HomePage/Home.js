import React from "react";
import "./Home.css";
import UserImage from "../../assets/user-img.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page-cont">
      {/* <div className="image-cont"></div> */}
      <div className="user-cont">
        <Link to="/profile" className="user-info">
          <div className="user-img-cont">
            <img className="user-img" src={UserImage} alt="" />
          </div>
          <div className="username">TopsyTurvy</div>
        </Link>
        <div className="quick-play-cont">
          <div className="game-info">
            <div className="play-icon">
              <i class="fa-solid fa-play"></i>
            </div>
            <div className="mode-any">
              Game Mode: <strong className="any-word">ANY</strong>
            </div>
          </div>
          <div className="play-btn">QUICK PLAY</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
