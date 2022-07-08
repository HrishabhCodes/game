import React, { useContext, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import GameChat from "../gameChat/GameChat";
import SocketContext from "../../context/socketContext";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Logo from "../../assets/logo_doodle.png";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";

// import { db } from "../../firebase";
// import { addDoc, collection } from "@firebase/firestore";
const Home = () => {
  const [showGameChat, setShowGameChat] = useState(false);
  const [URL, setURL] = useState("");
  const ctx = useContext(SocketContext);

  const avatarRef = ref(storage, `avatars/${1}.png`);
  getDownloadURL(avatarRef)
    .then((url) => setURL(url))
    .catch((err) => console.log(err));

  const ShowGc = async () => {
    setShowGameChat(true);

    setShowGameChat(true);
  };
  // console.log(URL);

  return (
    <>
      {URL === "" ? (
        <div>
          <Loading />
        </div>
      ) : (
        <motion.div
          className="home-page-cont"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="logo">
            <img className="vert-move" src={Logo} alt="" />
          </div>
          {!showGameChat ? (
            <div className="user-cont">
              <Link
                to="/profile"
                className="user-info"
                onClick={() => ctx.setActive("profile")}
              >
                <div className="user-img-cont">
                  <img className="user-img" src={URL} alt="" />
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
              </div>
            </div>
          ) : (
            <GameChat showGC={setShowGameChat} modal={setShowGameChat} />
          )}
        </motion.div>
      )}
    </>
  );
};

export default Home;
