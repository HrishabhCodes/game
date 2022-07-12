import { Box, Modal, Slider, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { Howl, Howler } from "howler";
import "./Navbar.css";
import SocketContext from "../../context/socketContext";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/nav_logo.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "rgb(71, 71, 71)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
  backgroundColor: "#000000",
};

function valuetext(value) {
  return `${value}°C`;
}

const Navbar = () => {
  const ctx = useContext(SocketContext);
  const [openModal, setOpenModal] = useState(false);
  const [vol, setVol] = useState(0);
  const [playing, setPlaying] = useState(false);

  var sound = new Howl({
    src: [
      "https://firebasestorage.googleapis.com/v0/b/game-7da42.appspot.com/o/bgmusic.mp3?alt=media&token=a86c4a1b-a09d-4bc4-a60c-9b6287022c3a",
    ],
    loop: true,
    volume: 0.3,
    html5: true,
  });

  const handleOpen = () => {
    if (!playing) {
      setVol(100);
      sound.play();
      setPlaying(true);
    }
    setOpenModal(true);
  };

  const handleVolume = (event) => {
    setVol(event.target.value);
    Howler.volume(event.target.value / 100);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-items">
        <div className="nav-logo">
          <img className="logo-img" src={Logo} alt="" />
        </div>
        {ctx.start ? (
          ""
        ) : (
          <div className="nav-pages">
            <NavLink className="home-page" to="/">
              <div>HOME</div>
            </NavLink>
            <NavLink className="play-page" to="/play">
              <div>PLAY</div>
            </NavLink>
            <NavLink className="profile-page" to="/profile">
              <div>PROFILE</div>
            </NavLink>
          </div>
        )}
        <div onClick={handleOpen} className="volume-container">
          <div className="volume">
            {vol >= 50 ? (
              <i className="fa-solid fa-volume-high"></i>
            ) : vol > 0 ? (
              <i className="fa-solid fa-volume-low"></i>
            ) : vol === 0 ? (
              <i className="fa-solid fa-volume-xmark"></i>
            ) : null}
          </div>
        </div>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal" sx={style}>
            <div className="close">
              <i
                onClick={() => setOpenModal(false)}
                className="fa-solid fa-xmark"
              ></i>
            </div>
            <Typography
              className="vol-title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Volume
            </Typography>

            <Slider
              aria-label="Temperature"
              value={vol}
              getAriaValueText={valuetext}
              onChange={handleVolume}
              sx={{ color: "#1dd6f2;" }}
              className="vol-slider"
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
