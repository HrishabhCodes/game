import { Box, Modal, Slider, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import SocketContext from "../../context/socketContext";
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

const Navbar = ({ active, setActive }) => {
  const ctx = useContext(SocketContext);
  const [openModal, setOpenModal] = useState(false);
  const [vol, setVol] = useState(100);
  const handleOpen = () => setOpenModal(true);
  const handleVolume = (event) => {
    setVol(event.target.value);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-items">
        <div className="logo">
          {/* <img className="logo-img" src={Logo} alt="" /> */}
        </div>
        {ctx.start ? (
          ""
        ) : (
          <div className="nav-pages">
            <Link
              onClick={() => setActive("home")}
              className={`${active === "home" ? "active" : ""} home-page`}
              to="/"
            >
              <div>HOME</div>
            </Link>
            <Link
              onClick={() => setActive("play")}
              className={`${active === "play" ? "active" : ""} play-page`}
              to="/play"
            >
              <div>PLAY</div>
            </Link>
            <Link
              onClick={() => setActive("profile")}
              className={`${active === "profile" ? "active" : ""} profile-page`}
              to="/profile"
            >
              <div>PROFILE</div>
            </Link>
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
              defaultValue={vol}
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
